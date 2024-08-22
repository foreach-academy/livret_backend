const Formation_ModuleServ = require ('../Services/formation_moduleService')
class Formation_ModuleControl{
    async getAllFormationModule(req, res){
        try{
            const formationModule = await Formation_ModuleServ.getAllFormationModule(req, res)
            res.json(formationModule)
        }catch(error){
            res.status(500).json({error: 'An error occured while getting all formation_module'});
        }
    }

    async getFormationModuleById(req, res){
        try{
            const formationModule = await Formation_ModuleServ.getFormationModuleById(req.params.id)
            res.json(formationModule)
        }catch(error){
            res.status(500).json({error: 'An error occured while getting formation_module'});
        }
    }

    async addFormationModule(req, res){
        try{
            const formationModule = await Formation_ModuleServ.addFormationModule(req.body)
            res.json(formationModule)
        }catch(error){
            res.status(500).json({error: 'An error occured while adding formation_module'});
        }
    }
}

module.exports = new Formation_ModuleControl();