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
// récupérer les utilisateur par role 
    async getUserByRole(req, res) {
        try {
            const role = xss(req.params.role); // Nettoyage du rôle
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

        // Nettoyage des données
        const sanitizedData = {
            firstname: xss(firstname),
            lastname: xss(lastname),
            email: xss(email),
            promo: xss(promo),
            birthdate: birthdate ? xss(birthdate) : null,
            created_at: created_at ? xss(created_at) : new Date(),
            updated_at: updated_at ? xss(updated_at) : new Date(),
            role_id: role_id ? parseInt(xss(role_id), 10) : null,
            password: await bcrypt.hash(password, 10), // Hashage du mot de passe
            position: position? xss(position) : null,
        };

        // Ajout de l'utilisateur
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
            const { firstname, lastname,position, email, birthdate, promo, role_id, company, password } = req.body;

            const sanitizedData = {}

            if (firstname) sanitizedData.firstname = xss(firstname);
            if (lastname) sanitizedData.lastname = xss(lastname);
            if (birthdate) sanitizedData.birthdate = xss(birthdate)
            if (email) sanitizedData.email = xss(email);
            if (promo) sanitizedData.promo = xss(promo);
            if (company) sanitizedData.company = xss(company);
            if (role_id) sanitizedData.role_id = xss(role_id);
            if (password) sanitizedData.password = xss(password);
            if (position) sanitizedData.position = xss(position)


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
