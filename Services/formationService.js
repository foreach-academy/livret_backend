import Formation from '../models/formation.js';
import Module from '../models/module.js';
import User from '../models/user.js';
import Evaluation from '../models/evaluation.js';
import EvaluationResultat from '../models/evaluationResultat.js';

class FormationService {
    // Récupérer toutes les formations
    async getAllFormations() {
        return await Formation.findAll();
    }

    async getFormationById(formationId) {
        return await Formation.findByPk(formationId)
    }

    // Ajouter une nouvelle formation
    async addFormation(formationData) {
        try {
            return await Formation.create(formationData);
        } catch (error) {
            console.error("Erreur lors de l'ajout de la formation:", error);
            throw error;
        }
    }
}

export default new FormationService();