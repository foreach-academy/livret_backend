const FormationServ = require('../services/formationService');

class FormationControl{
    async getAllFormation(req, res){
        try{
            const formation = await FormationServ.getAllFormation()
            res.json(formation)
        }catch(error){
            res.status(500).json({error: 'An error occured while getting formations'});
        }
    }

    async getUsersByFormationId(req, res){
        try{
            const formation = await FormationServ.getUsersByFormationId(req.params.id)
            res.json(formation);
        }catch(error){
            res.status(500).json({error: "An error occured while getting formation"});
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
};

module.exports = new FormationControl();