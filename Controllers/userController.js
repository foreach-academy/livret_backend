import userService from '../services/userServices.js';
import bcrypt from 'bcrypt';
import { CustomError } from '../errors/customError.js';

class UserController {
    // Récupérer tous les utilisateurs
    async getAllUsers(req, res, next) {
        try {
            const users = await userService.getAllUsers();
            res.json(users);
        } catch (error) {
            next(error);
        }
    }

    // Récupérer un utilisateur par son ID
    async getUserById(req, res, next) {
        try {
            const userId = req.params.id;
            const user = await userService.getUserById(userId);
            if (!user) {
                throw new CustomError("Utilisateur non trouvé.", 404);
            }
            res.json(user);
        } catch (error) {
            next(error);        }
    }

    // Récupérer les utilisateurs par rôle
    async getUserByRole(req, res, next) {
        try {
            const role = req.params.role;
            const users = await userService.getUserByRole(role);
            if (!users.length) {
                throw new CustomError("Aucun utilisateur de ce rôle n'a été trouvé.", 404);
            }
            res.json(users);
        } catch (error) {
            next(error);        }
    }

    // Ajouter un nouvel utilisateur
    async addUser(req, res, next) {
        try {
            const { firstname, lastname, email, role_id, position, password, birthdate, promo, created_at, updated_at } = req.body;

            // Validation des champs obligatoires
            if (!firstname || !lastname || !email || !password) {
                throw new CustomError("Les champs 'firstname', 'lastname', 'email', 'password' sont requis.", 400);
            }

            // Validation de l'email
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                throw new CustomError("L'email n'est pas valide.", 400);
            }

            const userData = {
                firstname,
                lastname,
                email,
                promo: promo || null,
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
            next(error);        }
    }

    // Mettre à jour un utilisateur par ID
    async updateUser(req, res, next) {
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
                throw new CustomError("Utilisateur non trouvé", 404);
            }
            res.json(user);
        } catch (error) {
            next(new CustomError("Une erreur s'est produite lors de la mise à jour de l'utilisateur", 500));
        }
    }

    // Supprimer un utilisateur
    async deleteUser(req, res, next) {
        try {
            const { id } = req.params;
            const user = await userService.deleteUser(id);
            if (!user) {
                throw new CustomError("Utilisateur non trouvé", 404);
            }
            res.json({ message: "Utilisateur supprimé avec succès" });
        } catch (error) {
            next(error);        }
    }
}

export default new UserController();
