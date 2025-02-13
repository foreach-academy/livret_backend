import TrainingService from "../services/trainingService.js";

import Training from "../models/training.js";
import sequelize from "../config/Sequelize.js";
import Module from "../models/module.js";
import TrainingModule from "../models/trainingModule.js";
class TrainingController {
    async getAllTrainings(req, res) {
        try {
            const trainings = await TrainingService.getAllTrainings();
            res.json(trainings);
        } catch (error) {
            console.error("Erreur lors de la récupération de toutes les formations:", error);
            res.status(500).json({ error: "Une erreur est survenue lors de la récupération des formations." });
        }
    }

    async getTrainingById(req, res) {
        const { trainingId } = req.params;

        try {
            const training = await TrainingService.getTrainingById(trainingId);
            res.json(training);
        } catch (error) {
            console.error("Erreur lors de la récupération de la formation:", error);
            res.status(500).json({ error: "Une erreur est survenue lors de la récupération de la formation." });
        }
    }

    async addTrainingWithModules(req, res) {
        const { title, description, modules } = req.body;

        if (!title) {
            return res.status(400).json({ error: "Un nom de formation est requis" });
        }

        const transaction = await sequelize.transaction(); // Démarrer une transaction Sequelize
        try {
            // Étape 1 : Ajouter la formation
            const training = await Training.create({ title, description  }, { transaction });

            // Étape 2 : Ajouter chaque module
            const modulePromises = modules.map(async (module) => {
                const newModule = await Module.create(
                    { title: module.title, commentary: module.commentary },
                    { transaction }
                );
                return newModule.id;
            });

            const moduleIds = await Promise.all(modulePromises);

            // Étape 3 : Associer chaque module à la formation
            const associationPromises = moduleIds.map(async (moduleId) => {
                return await TrainingModule.create(
                    { training_id: training.id, module_id: moduleId },
                    { transaction }
                );
            });

            await Promise.all(associationPromises);

            // Commit de la transaction
            await transaction.commit();

            res.status(201).json({ message: "Formation et modules ajoutés avec succès", trainingId: training.id });
        } catch (error) {
            await transaction.rollback(); // Annule les changements en cas d'erreur
            console.error("Erreur lors de l'ajout d'une formation avec modules:", error);
            res.status(500).json({ error: "Une erreur est survenue lors de l'ajout de la formation et des modules." });
        }
    }
}

export default new TrainingController();
