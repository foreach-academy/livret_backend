import Module from "../models/module.js";
import User from '../models/user.js';

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

export default new ModuleService();