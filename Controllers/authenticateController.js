import AuthenticateService from '../services/authenticateService.js';
import bcrypt from 'bcrypt';
import User from '../models/user.js';
import { CustomError } from '../errors/customError.js';

class AuthenticateController {
    async login(req, res, next) {
        try {
            const { email, password } = req.body;

            // Validation des données d'entrée
            if (!email || !password) {
                throw new CustomError("L'authentification a échoué. Email et mot de passe requis.", 400);
            }

            // Vérifier si l'utilisateur existe
            const user = await AuthenticateService.getUserByEmail(email);
            if (!user) {
                throw new CustomError("Email invalide.", 401);
            }

            // Vérification du mot de passe
            const checkPassword = await bcrypt.compare(password, user.password);
            if (!checkPassword) {
                throw new CustomError("Email ou mot de passe invalide.", 401);
            }

            // Génération du token
            const token = await AuthenticateService.createToken(user);
            return res.status(200).json({ message: `Bonjour ${user.firstname}`, token });
        } catch (error) {
            next(error)
        }
    }

    async subscribe(req, res, next) {
        try {
            const { email } = req.body;

            const user = await AuthenticateService.getUserByEmail(email);
            if (user) {
                throw new CustomError("Email déjà existant.", 409);
            }

            await AuthenticateService.subscribe(req.body);
            return res.status(201).json({ message: "Enregistrement réussi." });
        } catch (error) {
            next(error)
        }
    }

    async resetPassword(req, res, next) {
        const { password, token } = req.body;

        try {
            if (!password || !token) {
                throw new CustomError("Le mot de passe et le token sont requis.", 400);
            }

            const user = await User.findOne({ where: { reset_password_token: token } });
            if (!user) {
                throw new CustomError("Token invalide ou utilisateur introuvable.", 400);
            }

            const now = new Date();
            const nowInParis = new Date(now.toLocaleString("en-US", { timeZone: "Europe/Paris" }));
            const tokenExpiration = new Date(user.reset_password_expires);

            if (nowInParis > tokenExpiration) {
                throw new CustomError("Token expiré.", 400);
            }

            const hashedPassword = await bcrypt.hash(password, 10);
            user.password = hashedPassword;
            user.reset_password_token = null;
            user.reset_password_expires = null;

            await user.save();

            res.status(200).json({ message: "Mot de passe mis à jour avec succès." });
        } catch (error) {
            next(error)
        }
    }
}

export default new AuthenticateController();
