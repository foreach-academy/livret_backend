const { request } = require('express');
const userService = require('../services/userService');
const sendEmail = require("../SendEmail/SendEmail")
class UserController{

    async getAllUser(req, res){
        try{
            const  user= await userService.getAllUser();
            res.json(user)
        }catch(error){
            console.error('erreur trouvée', error)
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

    async getUserByRole(req, res){
        try{
            const roleName = req.params.roleName;
            const users = await userService.getUsersByRole(roleName)
            console.log(users)
            res.json(users)
        }catch(error){
            console.log(error)
            res.status(500).json({error: " Un erreur s'est produite lors de la récuperation des utilisateurs par rôle"})
        }
    }  

    async addUser(req, res) {
        try {
            console.log(req.body);
    
            // Ajouter l'utilisateur en utilisant le service
            const user = await userService.addUser(req.body);
    
            // Si l'utilisateur est ajouté avec succès, envoie l'email
            if (user) {
                try {
                    await sendEmail(user);
                    console.log('Email envoyé à :', user.email);
                } catch (emailError) {
                    console.error('Erreur lors de l\'envoi de l\'email :', emailError);
                }
            }
    
            // Répondre avec l'utilisateur ajouté
            res.json(user);
    
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Une erreur s'est produite lors de l'ajout d'utilisateur" });
        }
    }
    
    async updateUser(req, res){
        try {
            const user = await userService.updateUser(req.params.id,req.body);
            res.json(user);
        } catch (error) {
            console.log(error);
            res.status(500);
            res.json({error : "Une erreur s'est produite lors de la mise à jour de l'utilisateur"});
        }
    }

    async deleteUser(req, res){
        try {
            const user = await userService.deleteUser(req.params.id);
            res.json(user);
        } catch (error) {
            console.log(error);
            res.status(500);
            res.json({error : "Une erreur s'est produite lors de la suppression de l'utilisateur"});
        }
    }
    
};

module.exports = new UserController();