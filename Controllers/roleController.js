const roleService = require('../Services/roleService');

class RoleController{
    async getAllRole(req, res){
        try{
            const role = await roleService.getAllRole()
            res.json(role)
        }catch(error){
            res.status(500),
            res.json({error:" Une erreur s'est produite lors de la recuperation des roles"})
        }
    }

    async getRoleById(req, res){
        try{
            const role = await roleService.getRoleById(req.params.id)
            res.json(role)
        }catch(error){
            res.status(500),
            res.json({error: "Une erreur s'est produite lors de la recuperation de role"})
        }
    }

    async addRole(req, res){
        try{
            const role = await roleService.addRole(req.body)
            res.json(role)
        }catch(error){
            res.status(500),
            res.json({error: "Une erreur s'est produite lors de l'ajout de role"})
        }
    }
};

module.exports = new RoleController();