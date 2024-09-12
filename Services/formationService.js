const Formation = require('../Models/formation');
const Module = require('../Models/module');
const User = require('../Models/user');

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