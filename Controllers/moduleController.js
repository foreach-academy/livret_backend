import ModuleService from '../services/moduleServices.js';
import xss from 'xss';

class ModuleControl {
    async getAllModules(req, res) {
        try {
            const modules = await ModuleService.getAllModules();
            res.json(modules);
        } catch (error) {
            console.error('Erreur lors de la récupération de tous les modules:', error);
            res.status(500).json({ error: "Une erreur est survenue lors de la récupération de tous les modules." });
        }
    }

    async getModuleById(req, res){

        const {moduleId} = req.params

        try{
            const module = await ModuleService.getModuleById(moduleId)
            res.status(200).json(module);
        }catch(error){
            res.status(500).json({error: " An error occured while getting module"});
        }
    }

};

export default new ModuleControl();