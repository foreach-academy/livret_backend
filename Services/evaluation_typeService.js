const EvaluationType = require('../Models/evaluation_type');
const ModuleEvaluationType = require('../Models/module_evaluation_type');

class EvaluationTypeServ{
    async getAllEvaluationType(){
        return await EvaluationType.findAll();
    }

    async getEvaluationTypeById(evaluationTypeId){
        return await EvaluationType.findByPk(evaluationTypeId);
    }

    async addEvaluationType(eveluationTypeData){
        return await EvaluationType.create(eveluationTypeData);
    }

    async addEvaluationTypeToModule (moduleEvaluationType) {
        return await ModuleEvaluationType.create(moduleEvaluationType);
    }

    async getEvaluationTypeByModuleId(moduleId) {
        return await ModuleEvaluationType.findAll( {
            where: {
                module_id: moduleId
            }
        }
        )
    }

    async removeEvaluationTypeFromModule(moduleId, evaluationTypeId) {
        return await ModuleEvaluationType.destroy({
            where: {
                module_id: moduleId,
                evaluation_type_id: evaluationTypeId
            }
        });
    }
};

module.exports = new EvaluationTypeServ();
