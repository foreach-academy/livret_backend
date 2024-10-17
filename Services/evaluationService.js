const Evaluation = require('../models/evaluation');
const EvaluationResultat = require('../Models/evaluation_resultat');
const EvaluationType = require('../Models/evaluation_type');
const Module = require('../models/module');
const User = require('../models/user');
const ApprenantsFormation = require('../Models/apprenants_formations');
const Formation = require('../models/formation');

class EvaluationServ{
    async getAllEvaluation(){
        return await Evaluation.findAll({include:[Module, User, {
            model: EvaluationType, as: 'evaluationType'}
        ]});
    }

    

    // async getEvaluationForStudentsByModule(moduleId){
    //     return await Evaluation.findAll({
    //         where: {
    //             module_id: moduleId,
    //         },
    //         include: [{
    //             model: User,
    //             as: 'apprenant',
    //             attributes: ['first_name', 'surname', 'email', 'company'] 
    //         },
    //         {
    //             model: EvaluationResultat,
    //             as: 'resultat', 
    //             attributes: ['name'],
    //         },
    //     ]
    //     })
    // }

    async addEvaluation(evaluationData){
        return await Evaluation.create(evaluationData, {include:[Module, User, {
            model: EvaluationType, as:'evaluationType'
        }]});
    }
};

module.exports = new EvaluationServ();