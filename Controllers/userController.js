const userService = require('../Services/userService');

class UserController{
    async getAllUser(req, res){
        try{
            const  user= await userService.getAllUser();
            res.json(user)
        }catch(error){
            res.status(500),
            res.json({error: "Une erreur s'est produite lors de la recuperation des utilisateurs"})
        }
    }

    async getUserById(req, res){
        try{
            const user= await userService.getUserById(req.params.id)
            res.json(user)
        }catch(error){
            console.error('user id introuvable', error)
            res.status(500),
            res.json({error: "Une erreur s'est produite lors de la recuperation d'utilisateur"})
        }
    }

    async addUser(req, res){
        try{
            const user = await userService.create(req.body)
            res.json(user)
        }catch(error){
            res.status(500),
            res.json({error: "Une erreur s'est produite lors de l'ajout d'utilisateur"})
        }
    }


};

module.exports = new UserController();