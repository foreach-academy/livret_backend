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

    // async getStudentsByFormation(formationId){
    //     return await Formation.findByPk(formationId, {
    //         include: [{
    //             model: User, 
    //             as: 'user',
    //         }]
    //     });
    // }

    async getStudentsEvaluationsByFormationAndModule(formationId, moduleId) {
        // Récupérer la formation et ses étudiants
        const formationWithStudents = await Formation.findByPk(formationId, {
            include: [{
                model: User,
                as: 'apprenants', // Vérifiez que c'est le bon alias pour les utilisateurs
                include: [{
                    model: Evaluation,
                    as: 'evaluation', // Assurez-vous que c'est le bon alias pour les évaluations
                    where: { module_id: moduleId },
                    required: false, // Ne pas forcer la correspondance
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
    
    

    async addFormation(formationData){
        return await Formation.create(formationData, {include:[Module, {model: User, as:'user'}]});
    }
}

module.exports = new FormationServ();