import EvaluationResultatsServices from '../services/evaluationResultatsService.js'

class EvaluationResultatsController {
    async getAllEvaluationResultats (req, res) {
        try {
            const response = await EvaluationResultatsServices.getAllEvaluationResultats();
            res.json(response);
        } catch (error) {
            res.status.json({error : "An error occurred while getting evaluations resultats", details: error.message })
        }
    }
}

export default new EvaluationResultatsController();