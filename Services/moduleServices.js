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
    // modifier un module
    async updateModule (moduleId, title, commentary) {
        return await Module.update({ title, commentary }, { where: { id: moduleId } })
    }
    // ajouter un module
    async addModule (title, commentary, training_id) {
        return await Module.create({ title, commentary, training_id })
    }
    // supprimer un module
    async deleteModule (moduleId) {
        return await Module.destroy({ where: { id: moduleId } })
    }


}

export default new ModuleService();