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

    async addEvaluation (evaluation) {
        return await Evaluation.create(evaluation);
    }

};

module.exports = new EvaluationServ();