import userService from '../services/userServices.js';
import EmailsServices from "../services/emailServices.js";
import bcrypt from 'bcrypt';
import User from '../models/user.js';
import xss from 'xss'; // Assurez-vous d'installer cette bibliothèque avec npm

class UserController {
    // Récupérer tous les utilisateurs
    async getAllUsers(req, res) {
        try {
            const users = await userService.getAllUsers();
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

    // Ajouter un nouvel utilisateur
    async addUser(req, res) {
        try {
            const { firstname, lastname, email, role_id, password } = req.body;

            if (!firstname || !lastname || !email || !password) {
                return res.status(400).json({ error: "Les champs 'firstname', 'lastname', 'email' et 'password' sont requis." });
            }

            // Validation d'email
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                return res.status(400).json({ error: "L'email n'est pas valide." });
            }

            // Nettoyage des données pour éviter les attaques XSS
            const sanitizedData = {
                firstname: xss(firstname),
                lastname: xss(lastname),
                email: xss(email),
                password: password, // Le mot de passe sera hashé avant d'être stocké
                role_id: role_id
            };

            const user = await userService.addUser(sanitizedData);

            res.status(201).json(user);
        } catch (error) {
            console.error('Erreur lors de l\'ajout de l\'utilisateur:', error);
            res.status(500).json({ error: "Une erreur s'est produite lors de l'ajout de l'utilisateur" });
        }
    }

    // Mettre à jour un utilisateur par ID
    async updateUser(req, res) {
        try {
            const userId = xss(req.params.id);
            const { firstname, lastname, email, birthdate, promo, role_id, company, password } = req.body;

            const sanitizedData = {}

            if (firstname) sanitizedData.firstname = xss(firstname);
            if (lastname) sanitizedData.lastname = xss(lastname);
            if (birthdate) sanitizedData.birthdate = xss(birthdate)
            if (email) sanitizedData.email = xss(email);
            if (promo) sanitizedData.promo = xss(promo);
            if (company) sanitizedData.company = xss(company);
            if (role_id) sanitizedData.role_id = xss(role_id)
            if (password) sanitizedData.password = xss(password)

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

    // Supprimer un utilisateur
    async deleteUser(req, res) {

        const {id} = req.params

        try {
            const userId = xss(id);
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

export default new UserController();
