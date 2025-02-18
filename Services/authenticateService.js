import User from "../models/user.js";
import Role from '../models/role.js';
import jwt from 'jsonwebtoken';

class AuthenticateService {
    async getUserByEmail(email) {
        try {
            if (!email || typeof email !== 'string') {
                throw new Error("L'email fourni n'est pas valide.");
            }

            const user = await User.findOne({
                where: { email: email },
                include: [{
                    model: Role,
                    as: 'userRole'
                }]
            });

            if (!user) {
                return null;
            }

            return user.dataValues;

        } catch (error) {
            console.error("Erreur dans getUserByEmail:", error);
            throw new Error("Erreur lors de la récupération de l'utilisateur.");
        }
    };

    async subscribe(data) {
        try {
            if (!data || typeof data !== 'object' || !data.email || !data.firstname || !data.lastname) {
                throw new Error("Les données fournies sont incomplètes.");
            }

            const user = await User.create(data);

            console.log("Utilisateur enregistré avec succès:", user);

            return user;
        } catch (error) {
            console.error("Erreur dans subscribe:", error);
            throw new Error("Erreur lors de l'enregistrement de l'utilisateur.");
        }
    };

    async createToken(user) {
        try {
            if (!user || !user.id || !user.email || !user.firstname || !user.lastname) {
                throw new Error("Données utilisateur invalides pour la génération du token.");
            }

            const userPayload = {
                id: user.id,
                email: user.email,
                user: `${user.firstname} ${user.lastname}`,
                role: user.userRole.id ? user.userRole.name : "user"  // Assurer que role existe, sinon valeur par défaut
            };

            return jwt.sign(userPayload, process.env.PASSWORD_SECRET, { expiresIn: '30d' });

        } catch (error) {
            console.error("Erreur dans createToken:", error);
            throw new Error("Erreur lors de la génération du token.");
        }
    };
}

export default new AuthenticateService();
