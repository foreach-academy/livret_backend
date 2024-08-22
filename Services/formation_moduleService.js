const Formation_Module = require('../Models/formation_module');

class Formation_ModuleServ{
    async getAllFormationModule(){
        return await Formation_Module.findAll();
    }

    async getFormationModuleById(formationModuleId){
        return await Formation_Module.findByPk(formationModuleId);
    }

    async addFormationModule(formationModuleData){
        return await Formation_Module.create(formationModuleData);
    }
}

module.exports = new Formation_ModuleServ();