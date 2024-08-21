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

    async getModuleById(req, res){
        try{
            const module = await ModuleService.getModuleById(req.params.id)
            res.json(module)
        }catch(error){
            res.status(500).json({error: " An error occured while getting module"});
        }
    }

    async addModule(req, res){
        try{
            const module = await ModuleService.addModule()
            res.json(module)
        }catch(error){
            res.status(500).json({error:" An error occured while adding module"})
        }
    }
};

module.exports = new ModuleControl();