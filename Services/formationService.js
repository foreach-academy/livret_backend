const Formation = require('../Models/formation');
const Module = require('../Models/module');
const User = require('../Models/user');
const Evaluation = require('../Models/evaluation')
const EvaluationResultat = require('../Models/evaluation_resultat')

class FormationServ{
    async getAllFormation(){
        return await Formation.findAll();
    }

    async getUsersByFormationId(formationId){
        return await Formation.findByPk(formationId, {
            include: [{
                model: User, 
                as: 'user',
            }]
        });
    }

    async getStudentsEvaluationsByFormationAndModule(formationId, moduleId) {
        const formationWithStudents = await Formation.findByPk(formationId, {
            include: [{
                model: User,
                as: 'apprenants', 
                include: [{
                    model: Evaluation,
                    as: 'evaluation',
                    where: { module_id: moduleId },
                    required: false, 
                    include: [{
                        model: EvaluationResultat,
                        as: 'resultat',
                        attributes: ['name'],
                    }]
                }]
            }]
        });
        return formationWithStudents;
    }
    
    async getModulesByFormationId(formationId) {
        return await Formation.findByPk(formationId, 
            {
            include: [{
                model: Module,
                as: 'modules',
            }]
        }
    )}

    async getModulesByFormationIdAndFormateurId(formationId, formateurId) {
        return await Formation.findByPk(formationId, 
            {
            include: [{
                model: Module,
                as: 'modules',
                where : { formateur_id : formateurId }
            }]
        }
    )
    }


    async addFormation(formationData){
        return await Formation.create(formationData, {include:[Module, {model: User, as:'user'}]});
    }
}

module.exports = new FormationServ();