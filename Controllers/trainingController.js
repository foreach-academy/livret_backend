import TrainingService from "../services/trainingService.js";
import Training from "../models/training.js";
import sequelize from "../config/Sequelize.js";
import Module from "../models/module.js"; 
import { CustomError } from '../errors/customError.js';

class TrainingController {
    async getAllTrainings(req, res, next) {
        try {
            const trainings = await TrainingService.getAllTrainings();
            res.json(trainings);
        } catch (error) {
            next(new CustomError("Une erreur est survenue lors de la récupération des formations.", 500));
        }
    }

    async getTrainingById(req, res, next) {
        const { trainingId } = req.params;

        try {
            const training = await TrainingService.getTrainingById(trainingId);
            if (!training) {
                throw new CustomError("Formation non trouvée.", 404);
            }
            res.json(training);
        } catch (error) {
           next(error)
        }
    }

    async addTrainingWithModules(req, res, next) {
        const { title, description, modules } = req.body;

        if (!title) {
            throw new CustomError("Un nom de formation est requis.", 400);
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
            next(error)
        }
    }

    async updateTrainingById(req, res, next) {
        const { trainingId } = req.params;
        const { title, description } = req.body;

        if (!title && !description) {
            throw new CustomError("Au moins un des champs est requis.", 400);
        }

        try {
            const training = await Training.findByPk(trainingId);

            if (!training) {
                throw new CustomError("Formation non trouvée.", 404);
            }

            await training.update({ title, description });

            res.status(200).json({ message: "Formation mise à jour avec succès." });
        } catch (error) {
            next(error)
        }
    }
}

export default new TrainingController();
