const ModuleService = require('../Services/moduleService');

class ModuleControl{
    async getAllModule(req, res){
        try{
            const module = await ModuleService.getAllModule()
            res.json(module)
        }catch(error){
            console.error('ici la source ', error)
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
            const module = await ModuleService.addModule(req.body)
            res.json(module)
        }catch(error){
            res.status(500).json({error:" An error occured while adding module"})
        }
    }

    async getModuleDetails(req, res) {
        console.log('tentative de recuperation des details du moddule')
        try {
            const details = req.params.details
            const modules = await ModuleService.getModuleDetails(details);
            res.json(modules);
        } catch (error) {
            console.error('Error fetching module details:', error.message, error.stack);
            res.status(500).json({ error: "An error occurred while fetching module details" });
        }
    }

};

module.exports = new ModuleControl();