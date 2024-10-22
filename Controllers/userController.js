// /controllers/userController.js

const userService = require('../Services/userService');
const EmailsServices = require("../Services/EmailsServices");
const bcrypt = require('bcrypt');
const User = require('../Models/user');
const xss = require('xss'); // Assurez-vous d'installer cette bibliothèque avec npm
const { utcToZonedTime } = require('date-fns-tz');

class UserController {
    // Récupérer tous les utilisateurs
    async getAllUser(req, res) {
        try {
            const users = await userService.getAllUser();
            res.json(users);
        } catch (error) {
            console.error('Erreur lors de la récupération des utilisateurs:', error);
            res.status(500).json({ error: "Une erreur s'est produite lors de la récupération des utilisateurs" });
        }
    }

    // Récupérer un utilisateur par son ID
    async getUserById(req, res) {
        try {
            const userId = xss(req.params.id); // Nettoyage de l'ID utilisateur
            const user = await userService.getUserById(userId);
            if (!user) {
                return res.status(404).json({ error: "Utilisateur non trouvé." });
            }
            res.json(user);
        } catch (error) {
            console.error('Erreur lors de la récupération de l\'utilisateur par ID:', error);
            res.status(500).json({ error: "Une erreur s'est produite lors de la récupération de l'utilisateur" });
        }
    }

    // Récupérer les utilisateurs par rôle
    async getUserByRole(req, res) {
        try {
            const roleName = xss(req.params.roleName); // Nettoyage du nom de rôle
            const users = await userService.getUsersByRole(roleName);
            res.json(users);
        } catch (error) {
            console.error('Erreur lors de la récupération des utilisateurs par rôle:', error);
            res.status(500).json({ error: "Une erreur s'est produite lors de la récupération des utilisateurs par rôle" });
        }
    }

    // Ajouter un nouvel utilisateur
    async addUser(req, res) {
        try {
            // Validation des données d'entrée
            const { first_name, surname, email, birthdate, promo, role_id, company, password } = req.body;

            // Vérifiez que tous les champs requis sont présents
            if (!first_name || !surname || !email || !promo || !company || !password) {
                return res.status(400).json({ error: "Les champs 'first_name', 'surname', 'email', 'promo', 'company' et 'password' sont requis." });
            }

            // Validation d'email
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                return res.status(400).json({ error: "L'email n'est pas valide." });
            }

            // Nettoyage des données pour éviter les attaques XSS
            const sanitizedData = {
                first_name: xss(first_name),
                surname: xss(surname),
                email: xss(email),
                birthdate: birthdate || null, // Laisser la date telle quelle
                promo: xss(promo),
                company: xss(company),
                password: password, // Le mot de passe sera hashé avant d'être stocké
                role_id: role_id || null // Si le rôle n'est pas fourni, on l'initialise à null
            };

            // Créer l'utilisateur via le service
            const user = await userService.addUser(sanitizedData);

            // Envoi d'un e-mail de bienvenue si l'utilisateur a été créé
            if (user) {
                try {
                    await EmailsServices.sendWelcomeEmail(user);
                    console.log('Email envoyé à :', user.email);
                } catch (emailError) {
                    console.error('Erreur lors de l\'envoi de l\'email:', emailError);
                }
            }

            res.status(201).json(user); // Retourner un statut 201 pour la création réussie
        } catch (error) {
            console.error('Erreur lors de l\'ajout de l\'utilisateur:', error);
            res.status(500).json({ error: "Une erreur s'est produite lors de l'ajout de l'utilisateur" });
        }
    }

    // Mettre à jour un utilisateur par ID
    async updateUser(req, res) {
        try {
            const userId = xss(req.params.id); // Nettoyage de l'ID utilisateur
            const sanitizedData = req.body; // Optionnel : Vous pouvez nettoyer les données du corps ici
            const user = await userService.updateUser(userId, sanitizedData);
            if (!user) {
                return res.status(404).json({ error: "Utilisateur non trouvé" });
            }
            res.json(user);
        } catch (error) {
            console.error('Erreur lors de la mise à jour de l\'utilisateur:', error);
            res.status(500).json({ error: "Une erreur s'est produite lors de la mise à jour de l'utilisateur" });
        }
    }

   // Mettre à jour un utilisateur via le token de réinitialisation de mot de passe
    async updateUserByToken(req, res) {
        const { password, token } = req.body;

        try {
            // Validation des données d'entrée
            if (!password || !token) {
                return res.status(400).json({ message: "Le mot de passe et le token sont requis." });
            }

            // Rechercher l'utilisateur via le token
            const user = await User.findOne({ where: { resetPasswordToken: token } });

            if (!user) {
                return res.status(400).json({ message: "Token invalide ou utilisateur introuvable." });
            }

            // Obtenir la date actuelle en UTC
            const now = new Date(); // Cette date est en UTC

            // Obtenir l'heure locale de Paris (UTC +1)
            const nowInParis = new Date(now.toLocaleString("en-US", { timeZone: "Europe/Paris" }));

            // Ajouter 2 heures à l'heure actuelle à Paris
            nowInParis.setHours(nowInParis.getHours() + 2);

            // La date d'expiration du token en UTC
            const tokenExpiration = new Date(user.resetPasswordExpires); // Supposé en UTC

            console.log("date maintenant (Paris) : ", nowInParis, "expire le : ", tokenExpiration);

            // Comparer les dates
            if (nowInParis > tokenExpiration) {
                return res.status(400).json({ message: "Token expiré." });
            }

            // Hash du nouveau mot de passe
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


    // Supprimer un utilisateur
    async deleteUser(req, res) {
        try {
            const userId = xss(req.params.id); // Nettoyage de l'ID utilisateur
            const user = await userService.deleteUser(userId);
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
