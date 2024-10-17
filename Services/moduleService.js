const Module = require("../Models/module");
const User = require("../Models/user");

class ModuleService {
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