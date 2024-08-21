const Formation = require('../Models/formation');

class FormationServ{
    async getAllFormation(){
        return await Formation.findAll();
    }

    async getFormationByPk(formationId){
        return await Formation.findByPk(formationId);
    }

    async addFormation(formationData){
        return await Formation.create(formationData);
    }
}

module.exports = new FormationServ();