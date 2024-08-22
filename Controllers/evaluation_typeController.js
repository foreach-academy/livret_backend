const EvaluationTypeServ = require('../Services/evaluation_typeService');

class EvaluationTypeControl{
    async getAllEvaluationType(req, res){
        try{
            const evaluationType = await EvaluationTypeServ.getAllEvaluationType()
            res.json(evaluationType)
        }catch(error){
            res.status(500).json({error: 'An error occured while getting all evaluation types'});
        }
    }

    async getEvaluationTypeById(req, res){
        try{
            const evaluationType = await EvaluationTypeServ.getEvaluationTypeById(req.params.id)
            res.json(evaluationType)
        }catch(error){
            res.status(500).json({error: 'An error occured while getting evaluation type'});
        }
    }

    async addEvaluationType(req, res){
        try{
            const evaluationType = await EvaluationTypeServ.addEvaluationType(req.body)
            res.json(evaluationType)
        }catch(error){
            res.status(500).json({error: 'An error occured while adding evaluation type'})
        }
    }
};

module.exports = new EvaluationTypeControl();