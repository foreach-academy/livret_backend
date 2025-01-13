import EvaluationService from '../services/evaluationService.js';

class EvaluationControl{
    async getAllEvaluation(req, res){
        try{
            const evaluation = await EvaluationService.getAllEvaluation()
            res.json(evaluation)
        }catch(error){
            res.status(500).json({error: 'A error ocuured while getting all evaluations'});
        }
    }

    async addEvaluation(req, res){
        try{
            const evaluation = await EvaluationService.addEvaluation(req.body)
            res.json(evaluation)
        }catch(error){
            res.status(500).json({error: 'An error occured while adding this evaluation'});
        }
    }

    async editEvaluation(req, res) {
        try {
            const evaluation = await EvaluationService.editEvaluation(req.params.evaluationId, req.body);
            res.json(evaluation);
        } catch (error) {
            res.status(500).json({error: 'An error occured while editing this evaluation'});
        }
    }

};

export default new EvaluationControl();