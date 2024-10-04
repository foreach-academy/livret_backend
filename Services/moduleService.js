const Module = require("../Models/module");

class ModuleServ {
    async getModulesByFormateurId (formateurId) {
        return await Module.findAll( {
            where: { formateur_id : formateurId }
        })
    }
}

module.exports = new ModuleServ();