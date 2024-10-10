const EvaluationType = require('../models/evaluation_type');

class EvaluationTypeServ{
    async getAllEvaluationType(){
        return await EvaluationType.findAll()
    }

    async getEvaluationTypeById(evaluationTypeId){
        return await EvaluationType.findByPk(evaluationTypeId);
    }

    async addEvaluationType(eveluationTypeData){
        return await EvaluationType.create(eveluationTypeData);
    }
};

module.exports = new EvaluationTypeServ();
