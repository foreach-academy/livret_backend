import Training from '../models/training.js';
import Module from '../models/module.js';
import TrainingModule from '../models/trainingModule.js';

class TrainingService {
    // Récupérer toutes les formations
    async getAllTrainings() {
        return await Training.findAll();
    }

    async getTrainingById(trainingId) {
        return await Training.findByPk(trainingId, {
            include: [{
                model: Module,
                as: 'modules',  // Assurez-vous que cet alias correspond à la relation définie dans `setupRelations`
                attributes: ['id', 'title', 'commentary'],
                through: { attributes: [] } // Empêche Sequelize d'afficher les colonnes pivot de `TrainingModule`
            }]
        });
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
