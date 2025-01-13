import AuthenticateService from '../services/authenticateService.js';
import bcrypt from 'bcrypt';
import xss from 'xss';

class AuthenticateController {
    async login(req, res) {
        try {
            const { email, password } = req.body;
    
            // Validation des données d'entrée
            if (!email || !password) {
                return res.status(400).json({ error: "L'authentification a échoué" });
            }
    
            // Nettoyage des données pour éviter les attaques XSS
            const sanitizedEmail = xss(email);
            const sanitizedPassword = xss(password); // Ajouter le nettoyage du mot de passe
    
            // Vérifier si l'utilisateur existe
            const user = await AuthenticateService.getUserByEmail(sanitizedEmail);
            console.log(user);
            if (!user) {
                console.log('Erreur : utilisateur non trouvé pour l\'email:', sanitizedEmail);
                return res.status(401).json({ error: "Email ou mot de passe invalide" });
            }
    
            // Vérification du mot de passe
            const checkPassword = await bcrypt.compare(sanitizedPassword, user.password); // Utiliser le mot de passe nettoyé
            console.log(checkPassword);
    
            if (!checkPassword) {
                return res.status(401).json({ message: "Email ou mot de passe invalide" });
            }
    
            // Génération du token
            const token = await AuthenticateService.createToken(user);
            return res.status(200).json({ message: "Connexion réussie", token });
        } catch (error) {
            console.error("Erreur lors de la connexion:", error);
            res.status(500).json({ error: "Erreur interne du serveur" });
        }
    };
}

export default new AuthenticateController
