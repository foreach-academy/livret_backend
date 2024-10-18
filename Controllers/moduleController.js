const ModuleService = require('../services/moduleService');
const xss = require('xss');

class ModuleControl {
    async getAllModule(req, res) {
        try {
            const modules = await ModuleService.getAllModule();
            res.json(modules);
        } catch (error) {
            console.error('Erreur lors de la récupération de tous les modules:', error);
            res.status(500).json({ error: "Une erreur est survenue lors de la récupération de tous les modules." });
        }
    }

    // async getModulesByFormateurId (req, res) {
    //     try {
    //         const modules = await ModuleService.getModulesByFormateurId(req.params.formateurId);
    //         res.json(modules);
    //     } catch (error) {
    //         res.status(500).json({error: "An error occured while getting modules for this teacher"})
    //     }
    // }

    async getModuleById(req, res){
        try{
            const module = await ModuleService.getModuleById(req.params.moduleId)
            res.json(module);
        }catch(error){
            res.status(500).json({error: " An error occured while getting module"});
        }
    }

    async addModule(req, res){
        try{
            const module = await ModuleService.addModule(req.body)
            res.json(module)
        }catch(error){
            res.status(500).json({error:" An error occured while adding module"})
        }
    }

};

module.exports = new ModuleControl();
