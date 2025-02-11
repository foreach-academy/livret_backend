import Training from '../models/training.js';
import Module from '../models/module.js';
import User from '../models/user.js';
import Evaluation from '../models/evaluation.js';
import EvaluationResultat from '../models/evaluationResult.js';

class TrainingService {
    // Récupérer toutes les formations
    async getAllTrainings() {
        return await Training.findAll();
    }

    async getTrainingById(trainingId) {
        return await Training.findByPk(trainingId)
    }

    // Ajouter une nouvelle formation
    async addTraining(trainingData) {
        try {
            return await Training.create(trainingData);
        } catch (error) {
            console.error("Erreur lors de l'ajout de la formation:", error);
            throw error;
        }
    }
}

export default new TrainingService();