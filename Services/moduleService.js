const Module =require('../Models/module');
const User = require('../Models/user');

class ModuleService{
    async getAllModule(){
        return await Module.findAll();
    }

    async getModuleById(moduleId){
        return await Module.findByPk(moduleId, {include:[User]});
    }

    async addModule(mouleData){
        return await Module.create(mouleData, {include: [User]});
    }
};

module.exports = new ModuleService();