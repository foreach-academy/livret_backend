import User from "../models/user.js";
import Role from '../models/role.js';

import jwt from 'jsonwebtoken';
import xss from 'xss'; // Importer la bibliothèque xss


class AuthenticateService {
    async getUserByEmail(email) {
        try {
            // Trouver un utilisateur par son email
            const user = await User.findOne({
                where: { email: email },
                include: [{
                    model: Role,
                    as: 'role'
                }]
            });
            // Retourner null si l'utilisateur n'existe pas
            return user ? user.dataValues : null;
        } catch (error) {
            console.error("Erreur lors de la récupération de l'utilisateur par email:", error);
            throw new Error("Erreur lors de la récupération de l'utilisateur");
        }
    };

    // créer un token
    async createToken(user) {
        const userPayload = {
            id: user.id,
            email: user.email,
            user: `${xss(user.first_name)} ${xss(user.surname)}`, // Nettoyer les noms
            role: xss(user.role.name) // Nettoyer le nom du rôle
        };
        return jwt.sign(userPayload, process.env.PASSWORD_SECRET, { expiresIn: '30d' });
    }; 
}


export default new AuthenticateService()
