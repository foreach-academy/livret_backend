const Formation = require('../Models/formation');
const Mark = require('../Models/mark');
const Module =require('../Models/module');
const User = require('../Models/user');

class ModuleService{
    async getAllModule(){
        return await Module.findAll({include:[Formation,]});
    }

    async getModuleById(moduleId){
        return await Module.findByPk(moduleId, {include:[{model:User, as: 'user'}, Formation,]});
    }

    async addModule(moduleData){
        return await Module.create(moduleData, {include: [{model: User, as: 'user'}, Formation]});
    }
};

module.exports = new ModuleService();