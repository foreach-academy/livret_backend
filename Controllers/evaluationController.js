const EvaluationServ = require('../services/evaluationService');

class EvaluationControl{
    async getAllEvaluation(req, res){
        try{
            const evaluation = await EvaluationServ.getAllEvaluation()
            res.json(evaluation)
        }catch(error){
            res.status(500).json({error: 'A error ocuured while getting all evaluations'});
        }
    }

    async getEvaluationById(req, res){
        try{
            const evaluation = await EvaluationServ.getEvaluationById(req.params.id)
            res.json(evaluation)
        }catch(error){
            res.status(500).json({error: 'An error occured while getting evaluation'});
        }
    }

    async addEvaluation(req, res){
        try{
            const evaluation = await EvaluationServ.addEvaluation(req.body)
            res.json(evaluation)
        }catch(error){
            res.status(500).json({error: 'An error occured while adding evaluation'});
        }
    }
};

module.exports = new EvaluationControl();