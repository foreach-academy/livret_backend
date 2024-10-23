const Module = require("../Models/module");
const User = require('../Models/user');

class ModuleService {
    // récuperer un module par son ID
    async getModuleById (moduleId) {
        return await Module.findByPk(moduleId, {
            include:[{
                model: User, 
                as: 'formateur'
            }] 
        })
    }
}

module.exports = new ModuleService();