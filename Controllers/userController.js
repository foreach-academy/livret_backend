const userService = require('../services/userService');
const EmailsServices = require("../services/EmailsServices");
const bcrypt = require('bcrypt');
const User = require('../models/user'); 

class UserController {

    async getAllUser(req, res) {
        try {
            const users = await userService.getAllUser();
            res.json(users);
        } catch (error) {
            console.error('Erreur lors de la récupération des utilisateurs:', error);
            res.status(500).json({ error: "Une erreur s'est produite lors de la récupération des utilisateurs" });
        }
    }

    async getUserById(req, res) {
        try {
            const user = await userService.getUserById(req.params.id);
            res.json(user);
        } catch (error) {
            console.error('Erreur lors de la récupération de l\'utilisateur par ID:', error);
            res.status(500).json({ error: "Une erreur s'est produite lors de la récupération de l'utilisateur" });
        }
    }

    async getUserByRole(req, res) {
        try {
            const roleName = req.params.roleName;
            const users = await userService.getUsersByRole(roleName);
            res.json(users);
        } catch (error) {
            console.error('Erreur lors de la récupération des utilisateurs par rôle:', error);
            res.status(500).json({ error: "Une erreur s'est produite lors de la récupération des utilisateurs par rôle" });
        }
    }

    async addUser(req, res) {
        try {
            console.log(req.body);
            const user = await userService.addUser(req.body);

            if (user) {
                try {
                    await EmailsServices.sendWelcomeEmail(user);
                    console.log('Email envoyé à :', user.email);
                } catch (emailError) {
                    console.error('Erreur lors de l\'envoi de l\'email:', emailError);
                }
            }

            res.json(user);
        } catch (error) {
            console.error('Erreur lors de l\'ajout de l\'utilisateur:', error);
            res.status(500).json({ error: "Une erreur s'est produite lors de l'ajout de l'utilisateur" });
        }
    }

    async updateUser(req, res) {
        try {
            const user = await userService.updateUser(req.params.id, req.body);
            if (!user) {
                return res.status(404).json({ error: "Utilisateur non trouvé" });
            }
            res.json(user);
        } catch (error) {
            console.error('Erreur lors de la mise à jour de l\'utilisateur:', error);
            res.status(500).json({ error: "Une erreur s'est produite lors de la mise à jour de l'utilisateur" });
        }
    }

    // Fonction pour mettre à jour l'utilisateur via le token
    async updateUserByToken(req, res) {
    const { password, token } = req.body;

    try {
        // Rechercher l'utilisateur via le token
        const user = await User.findOne({ where: { resetPasswordToken: token } });

        if (!user) {
            return res.status(400).json({ message: "Token invalide ou utilisateur introuvable." });
        }

        // Vérifier si le token est expiré
        const now = new Date() + (7200000) ;
        console.log("la date et l'heure maintenant : ", now , "le token expire le " , user.resetPasswordExpires);
        if (now > user.resetPasswordExpires) {
            return res.status(400).json({ message: "Token expiré." });
        }

        // Hash du nouveau mot de passe
        console.log("le nouveau mot de passe et", password);
        const hashedPassword = await bcrypt.hash(password, 10);

        // Mise à jour du mot de passe de l'utilisateur
        user.password = hashedPassword;

        // Supprimer le token et son expiration pour qu'ils ne puissent pas être réutilisés
        user.resetPasswordToken = null;
        user.resetPasswordExpires = null;

        // Sauvegarder les changements dans la base de données
        await user.save();

        // Envoyer une réponse de succès
        res.status(200).json({ message: "Mot de passe mis à jour avec succès." });
    } catch (error) {
        console.error('Erreur lors de la mise à jour du mot de passe:', error);
        res.status(500).json({ message: "Erreur serveur lors de la mise à jour du mot de passe." });
    }
}


    async deleteUser(req, res) {
        try {
            const user = await userService.deleteUser(req.params.id);
            if (!user) {
                return res.status(404).json({ error: "Utilisateur non trouvé" });
            }
            res.json({ message: "Utilisateur supprimé avec succès" });
        } catch (error) {
            console.error('Erreur lors de la suppression de l\'utilisateur:', error);
            res.status(500).json({ error: "Une erreur s'est produite lors de la suppression de l'utilisateur" });
        }
    }
}

module.exports = new UserController();
