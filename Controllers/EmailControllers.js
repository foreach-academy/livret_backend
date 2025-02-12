import User from '../models/user.js'; 
import EmailsServices from '../services/emailServices.js'; 

class EmailController {
    
    // Contrôleur pour envoyer le lien de réinitialisation du mot de passe
    async requestPasswordReset(req, res) {
        try {
            const { email } = req.body;

            if (!email) {
                return res.status(400).json({ error: 'Email est requis.' });
            }

            const user = await User.findOne({ where: { email } });
            if (!user) {
                return res.status(404).json({ message: 'Utilisateur non trouvé.' });
            }

            // Envoyer le lien de réinitialisation du mot de passe
            await EmailsServices.sendLinkToResetPasswordEmail(user);

            return res.status(200).json({ message: 'Email de réinitialisation envoyé.' });
        } catch (error) {
            console.error('Erreur lors de la demande de réinitialisation du mot de passe:', error);
            return res.status(500).json({ message: 'Erreur lors de l\'envoi de l\'email de réinitialisation.' });
        }
    }
}

export default new EmailController();