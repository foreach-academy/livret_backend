const FormationServ = require('../Services/formationService');

class FormationControl{
    async getAllFormation(req, res){
        try{
            const formation = await FormationServ.getAllFormation()
            res.json(formation)
        }catch(error){
            res.status(500).json({error: 'An error occured while getting formations'});
        }
    }

    // async getUsersByFormationId(req, res){
    //     try{
    //         const formation = await FormationServ.getUsersByFormationId(req.params.id)
    //         res.json(formation);
    //     }catch(error){
    //         res.status(500).json({error: "An error occured while getting formation"});
    //     }
    // }

    async getStudentsEvaluationsByFormationAndModule(req, res) {
        try {
            const { formationId, moduleId } = req.params; 
            const students = await FormationServ.getStudentsEvaluationsByFormationAndModule(formationId, moduleId);
            res.json(students);
        } catch (error) {
            console.error('Error while getting students evaluations:', error); 
            res.status(500).json({ error: "An error occurred while getting formation", details: error.message }); // Ajoutez le message d'erreur
        }
    }
    async addFormation(req, res){
        try{
             const formation = await FormationServ.addFormation(req.body)
             res.json(formation)
        }catch(error){
            res.status(500).json({error: "An error occured while adding formation"})
        }
    }

    async getModulesByFormationId(req, res) {
        try {
            const modules = await FormationServ.getModulesByFormationId(req.params.formationId);
            res.json(modules);
        } catch(error) {
            res.status(500).json({error: "An error occured while getting modules for this formation"})
        }
    }

    async getModulesByFormationIdAndFormateurId(req, res) {
        try {
            const modules = await FormationServ.getModulesByFormationIdAndFormateurId(req.params.formationId, req.params.formateurId);
            res.json(modules);
        } catch (error) {
            res.status(500).json({error: "An error occured while getting modules for this formation and this teacher"})            
        }
    }

};

module.exports = new FormationControl();