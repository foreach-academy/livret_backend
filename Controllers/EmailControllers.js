import User from '../models/user.js'; // Assurez-vous que le chemin est correct
import EmailsServices from '../services/emailServices.js'; // Importer l'instance de EmailsServices
import xss from 'xss';

class emailController {
    
    // Contrôleur pour envoyer le lien de réinitialisation du mot de passe
    async requestPasswordReset(req, res) {
        try {
            console.log('Requête reçue pour réinitialisation de mot de passe:', req.body); // Ajouté pour le débogage

            const { email } = req.body;

            // Validation des données d'entrée
            if (!email) {
                return res.status(400).json({ error: 'Email est requis.' });
            }

            // Nettoyage de l'email pour éviter les attaques XSS
            const sanitizedEmail = xss(email);

            // Trouver l'utilisateur par email
            const user = await User.findOne({ where: { email: sanitizedEmail } });
            if (!user) {
                return res.status(404).json({ message: 'Utilisateur non trouvé.' });
            }

            // Envoyer le lien de réinitialisation du mot de passe
            await EmailsServices.sendLinkEmail(user);

            return res.status(200).json({ message: 'Email de réinitialisation envoyé.' });
        } catch (error) {
            console.error('Erreur lors de la demande de réinitialisation du mot de passe:', error);
            return res.status(500).json({ message: 'Erreur lors de l\'envoi de l\'email de réinitialisation.' });
        }
    }
}

export default new emailController();
