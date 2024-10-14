const Evaluation = require('../Models/evaluation');
const EvaluationResultat = require('../Models/evaluation_resultat');
const EvaluationType = require('../Models/evaluation_type');
const Module = require('../Models/module');
const User = require('../Models/user');
const ApprenantsFormation = require('../Models/apprenants_formations');
const Formation = require('../Models/formation');

class EvaluationServ{
    async getAllEvaluation(){
        return await Evaluation.findAll({include:[Module, User, {
            model: EvaluationType, as: 'evaluationType'}
        ]});
    }

    async addEvaluation (evaluation) {
        return await Evaluation.create(evaluation);
    }

};

module.exports = new EvaluationServ();