import AuthenticateService from '../services/authenticateService.js';
import bcrypt from 'bcrypt';
import User from '../models/user.js';

class AuthenticateController {
    async login(req, res) {
        try {
            const { email, password } = req.body;

            // Validation des données d'entrée
            if (!email || !password) {
                return res.status(400).json({ error: "L'authentification a échoué" });
            }

            // Vérifier si l'utilisateur existe
            const user = await AuthenticateService.getUserByEmail(email);

            if (!user) {
                console.log('Erreur : utilisateur non trouvé pour l\'email:', email);
                return res.status(401).json({ error: "Email invalide" });
            }

            // Vérification du mot de passe
            const checkPassword = await bcrypt.compare(password, user.password);

            if (!checkPassword) {
                return res.status(401).json({ message: "Email ou mot de passe invalide" });
            }

            // Génération du token
            const token = await AuthenticateService.createToken(user);
            return res.status(200).json({ message: `Bonjour ${user.firstname}`, token });
        } catch (error) {
            console.error("Erreur lors de la connexion:", error);
            res.status(500).json({ error: "Erreur interne du serveur" });
        }
    };

    async subscribe(req, res) {
        try {
            const { email } = req.body;

            const user = await AuthenticateService.getUserByEmail(email);

            if (user) {
                return res.status(401).json({ error: "Email déjà existant" });
            }

            AuthenticateService.subscribe(req.body);

            return res.status(200).json({ message: "Enregistrement réussi" });
        } catch (error) {
            res.status(500).json({ error: "Erreur interne du serveur" });
        }
    };

    async resetPassword(req, res) {
        const { password, token } = req.body;

        try {
            if (!password || !token) {
                return res.status(400).json({ message: "Le mot de passe et le token sont requis." });
            }

            const user = await User.findOne({ where: { reset_password_token: token } });

            if (!user) {
                return res.status(400).json({ message: "Token invalide ou utilisateur introuvable." });
            }

            const now = new Date();

            // Obtenir l'heure locale de Paris (UTC +1)
            const nowInParis = new Date(now.toLocaleString("en-US", { timeZone: "Europe/Paris" }));

            // La date d'expiration du token en UTC
            const tokenExpiration = new Date(user.reset_password_expires); // Supposé en UTC

            // Comparer les dates
            if (nowInParis > tokenExpiration) {
                return res.status(400).json({ message: "Token expiré." });
            }

            const hashedPassword = await bcrypt.hash(password, 10);
            user.password = hashedPassword;
            user.reset_password_token = null;
            user.reset_password_expires = null;

            await user.save();

            res.status(200).json({ message: "Mot de passe mis à jour avec succès." });
        } catch (error) {
            console.error('Erreur lors de la mise à jour du mot de passe:', error);
            res.status(500).json({ message: "Erreur serveur lors de la mise à jour du mot de passe." });
        }
    }
}

export default new AuthenticateController;
