import EvaluationType from '../models/evaluationType.js';
import ModuleEvaluationType from '../models/moduleEvaluationType.js';

class EvaluationTypeService{

    // récuperer tout les type d'évaluation
    async getAllEvaluationType(){
        return await EvaluationType.findAll();
    }

    // récuperer tout les type d'évaluation par son ID
    async getEvaluationTypeById(evaluationTypeId){
        return await EvaluationType.findByPk(evaluationTypeId);
    }

    // Ajouter une type d'évaluation
    async addEvaluationType(eveluationTypeData){
        return await EvaluationType.create(eveluationTypeData);
    }

    // Ajouter une type d'évaluation à un module
    async addEvaluationTypeToModule (moduleEvaluationType) {
        return await ModuleEvaluationType.create(moduleEvaluationType);
    }

    // récuperer une évaluation type par l'ID d'un module
    async getEvaluationTypeByModuleId(moduleId) {
        return await ModuleEvaluationType.findAll( {
            where: {
                module_id: moduleId
            }
        }
        )
    }

    // Supprimer une type d'évaluation d'un module
    async removeEvaluationTypeFromModule(moduleId, evaluationTypeId) {
        return await ModuleEvaluationType.destroy({
            where: {
                module_id: moduleId,
                evaluation_type_id: evaluationTypeId
            }
        });
    }
};

export default new EvaluationTypeService();
