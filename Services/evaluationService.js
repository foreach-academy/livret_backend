import Evaluation from '../models/evaluation.js';
import EvaluationType from '../models/evaluationType.js';
import Module from '../models/module.js';
import User from '../models/user.js';

class EvaluationService{

    // récuperer tout les évaluation
    async getAllEvaluation(){
        return await Evaluation.findAll({include:[Module, User, {
            model: EvaluationType, as: 'evaluationType'}
        ]});
    }

    // Ajouter une évaluation
    async addEvaluation (evaluation) {
        return await Evaluation.create(evaluation);
    }

    // Modifier une évaluation
    async editEvaluation (evaluationId, evaluation) {
        return await Evaluation.update(evaluation, {
            where : {
                id : evaluationId
            }
        })
    }

};

export default new EvaluationService();