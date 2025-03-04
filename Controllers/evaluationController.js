import EvaluationService from '../services/evaluationServices.js';
import { CustomError } from '../errors/customError.js';

class EvaluationController {
    async getAllEvaluation(req, res, next) {
        try {
            const evaluations = await EvaluationService.getAllEvaluation();
            res.json(evaluations);
        } catch (error) {
            next(error)
        }
    }
}

export default new EvaluationController();
