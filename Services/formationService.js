const Formation = require('../models/formation');
const Module = require('../models/module');
const User = require('../models/user');

class FormationServ{
    async getAllFormation(){
        return await Formation.findAll();
    }

    async getFormationByPk(formationId){
        return await Formation.findByPk(formationId, {include:[Module,{model: User, as:'user'}]});
    }

    async addFormation(formationData){
        return await Formation.create(formationData, {include:[Module, {model: User, as:'user'}]});
    }
}

module.exports = new FormationServ();