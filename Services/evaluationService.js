const Evaluation = require('../models/evaluation');
const EvaluationType = require('../models/evaluation_type');
const Module = require('../models/module');
const User = require('../models/user');

class EvaluationServ{
    async getAllEvaluation(){
        return await Evaluation.findAll({include:[Module, User, {
            model: EvaluationType, as: 'evaluationType'}
        ]});
    }

    async getEvaluationById(evaluationId){
        return await Evaluation.findByPk(evaluationId, {include:[Module, User, {
            model: EvaluationType, as: 'evaluationType'}
        ]});
    }

    async addEvaluation(evaluationData){
        return await Evaluation.create(evaluationData, {include:[Module, User, {
            model: EvaluationType, as:'evaluationType'
        }]});
    }
};

module.exports = new EvaluationServ();