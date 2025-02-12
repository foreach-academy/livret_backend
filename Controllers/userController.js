import userService from '../services/userServices.js';
import EmailsServices from "../services/emailServices.js";
import bcrypt from 'bcrypt';
import User from '../models/user.js';

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
            const userId = req.params.id;
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

    // récupérer les utilisateurs par rôle
    async getUserByRole(req, res) {
        try {
            const role = req.params.role;
            const users = await userService.getUserByRole(role);
            if (!users.length) {
                return res.status(404).json({ error: "Aucun utilisateur de ce rôle n'a été trouvé." });
            }
            res.json(users);
        } catch (error) {
            console.error('Erreur lors de la récupération des utilisateurs par rôle:', error);
            res.status(500).json({ error: "Une erreur s'est produite lors de la récupération des utilisateurs" });
        }
    }

    // Ajouter un nouvel utilisateur
    async addUser(req, res) {
        console.log("Données reçues :", req.body);

        
        try {
            const { firstname, lastname, email, role_id, position, password, birthdate, promo, created_at, updated_at } = req.body;

            // Validation des champs obligatoires
            if (!firstname || !lastname || !email || !password || !promo) {
                
                return res.status(400).json({ error: "Les champs 'firstname', 'lastname', 'email', 'password' et 'promo' sont requis." });
            }

            // Validation de l'email
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                return res.status(400).json({ error: "L'email n'est pas valide." });
            }

            const userData = {
                firstname,
                lastname,
                email,
                promo,
                birthdate: birthdate || null,
                created_at: created_at || new Date(),
                updated_at: updated_at || new Date(),
                role_id: role_id ? parseInt(role_id, 10) : null,
                password: await bcrypt.hash(password, 10),
                position: position || null,
            };

            const user = await userService.addUser(userData);
            res.status(201).json(user);
        } catch (error) {
            console.error('Erreur lors de l\'ajout de l\'utilisateur:', error);
            res.status(500).json({ error: "Une erreur s'est produite lors de l'ajout de l'utilisateur" });
        }
    }

    // Mettre à jour un utilisateur par ID
    async updateUser(req, res) {
        try {
            const userId = req.params.id;
            const { firstname, lastname, position, email, birthdate, promo, role_id, password } = req.body;

            const userData = {};
            if (firstname) userData.firstname = firstname;
            if (lastname) userData.lastname = lastname;
            if (birthdate) userData.birthdate = birthdate;
            if (email) userData.email = email;
            if (promo) userData.promo = promo;
            if (role_id) userData.role_id = role_id;
            if (password) userData.password = password;
            if (position) userData.position = position;

            const user = await userService.updateUser(userId, userData);
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
        try {
            const { id } = req.params;
            const user = await userService.deleteUser(id);
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
