import User from "../models/user.js";
import Role from '../models/role.js';
import jwt from 'jsonwebtoken';

class AuthenticateService {
    async getUserByEmail(email) {
        try {
            const user = await User.findOne({
                where: { email: email },
                include: [{
                    model: Role,
                    as: 'role'
                }]
            });

            return user ? user.dataValues : null;

        } catch (error) {
            throw new Error("Erreur lors de la récupération de l'utilisateur");
        }
    };

    async subscribe(data) {
        try {
            const user = await User.create(data);

            console.log("service", user);

            return user;
        } catch (error) {
            throw new Error("Erreur lors de l'enregistrement de l'utilisateur");
        }
    };

    // créer un token
    async createToken(user) {
        const userPayload = {
            id: user.id,
            email: user.email,
            user: `${user.firstname} ${user.lastname}`,
            role: user.role.name
        };
        return jwt.sign(userPayload, process.env.PASSWORD_SECRET, { expiresIn: '30d' });
    };
}

export default new AuthenticateService();
