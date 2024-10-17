const Module = require("../Models/module");

class ModuleService {
    async getModuleById (moduleId) {
        return await Module.findByPk(moduleId)
    }
}

module.exports = new ModuleService();