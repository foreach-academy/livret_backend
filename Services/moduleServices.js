import Module from "../models/module.js";
import User from '../models/user.js';

class ModuleService {
    // récuperer un module par son ID
    async getAllModules () {
        return await Module.findAll()
    }

    async getModuleById (moduleId) {
        return await Module.findByPk(moduleId)
    }
}

export default new ModuleService();