import TrainingService from "../services/trainingService.js";
import Training from "../models/training.js";
import sequelize from "../config/Sequelize.js";
import Module from "../models/module.js"; 

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
            const training = await Training.create({ title, description }, { transaction });

            // Étape 2 : Ajouter chaque module avec `training_id`
            const modulePromises = modules.map(async (module) => {
                return await Module.create(
                    { title: module.title, commentary: module.commentary, training_id: training.id },
                    { transaction }
                );
            });

            await Promise.all(modulePromises);

            // Commit de la transaction
            await transaction.commit();

            res.status(201).json({ message: "Formation et modules ajoutés avec succès", trainingId: training.id });
        } catch (error) {
            await transaction.rollback(); // Annule les changements en cas d'erreur
            console.error("Erreur lors de l'ajout d'une formation avec modules:", error);
            res.status(500).json({ error: "Une erreur est survenue lors de l'ajout de la formation et des modules." });
        }
    }

    async updateTrainingById(req, res) {
        const { trainingId } = req.params;
        const { title, description } = req.body;

        if (!title &&!description) {
            return res.status(400).json({ error: "Au moins un des champs est requis" });
        }

        try {
            const training = await Training.findByPk(trainingId);

            if (!training) {
                return res.status(404).json({ error: "Formation non trouvée" });
            }

            await training.update({ title, description });

            res.json({ message: "Formation mise à jour avec succès" });
        } catch (error) {
            console.error("Erreur lors de la mise à jour de la formation:", error);
            res.status(500).json({ error: "Une erreur est survenue lors de la mise à jour de la formation." });
        }
    }
}

export default new TrainingController();
