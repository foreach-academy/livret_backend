const Evaluation = require('../Models/evaluation');
const EvaluationType = require('../Models/evaluation_type');

class EvaluationServ{
    async getAllEvaluation(){
        return await Evaluation.findAll();
    }

    async getEvaluationById(evaluationId){
        return await Evaluation.findByPk(evaluationId, {include:[{
            model: EvaluationType, as: 'evaluationType'}
        ]});
    }

    async addEvaluation(evaluationData){
        return await Evaluation.create(evaluationData, {include:[{
            model: EvaluationType, as:'evaluationType'
        }]});
    }
};

module.exports = new EvaluationServ();