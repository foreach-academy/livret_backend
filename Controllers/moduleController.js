const ModuleService = require('../Services/moduleService');

class ModuleControl{
    
    async getAllModule(req, res){
        try{            
            const module = await ModuleService.getAllModule()
            res.json(module)
        }catch(error){
            res.status(500).json({error: "An error occured while getting all modules"});
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