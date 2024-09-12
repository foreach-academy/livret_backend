const userService = require('../services/userService');

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

    async getUserByRole(req, res){
        try{
            const roleName = req.params.roleName;
            const users = await userService.getUsersByRole(roleName)
            res.json(users)
        }catch(error){
            res.status(500).json({error: " Un erreur s'est produite lors de la récuperation des utilisateurs par rôle"})
        }
    }

    async createUserByAdmin(req, res) {
        const userdatas = req.body; // Récupérer les données du formulaire depuis la requête
        const currentUserRole = req.user.role; // Récupérer le rôle de l'utilisateur connecté
    
        try {
            // Appel du service pour créer l'utilisateur
            const newUser = await userService.AddUserByAdmin(userdatas, currentUserRole);
            res.status(201).json({ message: 'Utilisateur créé avec succès', user: newUser });
        } catch (error) {
            // Gestions des erreur
            if (error.message === 'Unauthorized') {
                res.status(403).json({ message: 'Vous n\'avez pas les permissions pour créer un utilisateur.' });
            } else {
                console.error('Erreur lors de la création de l\'utilisateur:', error);
                res.status(500).json({ message: 'Erreur interne du serveur lors de la création de l\'utilisateur.' });
            }
        }
    }
};

module.exports = new UserController();