import EvaluationService from '../services/evaluationServices.js';

class EvaluationControl{
    async getAllEvaluation(req, res){
        try{
            const evaluation = await EvaluationService.getAllEvaluation()
            res.json(evaluation)
        }catch(error){
            res.status(500).json({error: 'A error ocuured while getting all evaluations'});
        }
    }
};

export default new EvaluationControl();