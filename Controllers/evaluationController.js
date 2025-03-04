import EvaluationService from '../services/evaluationServices.js';
import { CustomError } from '../errors/customError.js';

class EvaluationController {
    async getAllEvaluation(req, res, next) {
        try {
            const evaluations = await EvaluationService.getAllEvaluation();
            res.json(evaluations);
        } catch (error) {
            next(new CustomError("Une erreur est survenue lors de la récupération des évaluations.", 500));
        }
    }
}

export default new EvaluationController();
