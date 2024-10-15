const EvaluationServ = require('../Services/evaluationService');

class EvaluationControl{
    async getAllEvaluation(req, res){
        try{
            const evaluation = await EvaluationServ.getAllEvaluation()
            res.json(evaluation)
        }catch(error){
            res.status(500).json({error: 'A error ocuured while getting all evaluations'});
        }
    }

    async addEvaluation(req, res){
        try{
            const evaluation = await EvaluationServ.addEvaluation(req.body)
            res.json(evaluation)
        }catch(error){
            res.status(500).json({error: 'An error occured while adding this evaluation'});
        }
    }

};

module.exports = new EvaluationControl();