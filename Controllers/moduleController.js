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

    // async getModuleById(req, res){
    //     try{
    //         const module = await ModuleService.getModuleById(req.params.id)
    //         res.json(module)
    //     }catch(error){
    //         res.status(500).json({error: " An error occured while getting module"});
    //     }
    // }

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
            const modules = await ModuleService.getModuleDetails();
            res.json(modules);
        } catch (error) {
            console.error('Error fetching module details:', error.message, error.stack);
            res.status(500).json({ error: "An error occurred while fetching module details" });
        }
    }

};

module.exports = new ModuleControl();