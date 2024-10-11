// /controllers/emailController.js

const User = require('../models/user'); // Assurez-vous que le chemin est correct
const EmailsServices = require('../services/EmailsServices'); // Importer l'instance de EmailsServices

class emailController {
    // Contrôleur pour envoyer le lien de réinitialisation du mot de passe
    async requestPasswordReset(req, res) {
        try {
            console.log('Requête reçue pour réinitialisation de mot de passe:', req.body); // Ajouté pour le débogage

            const { email } = req.body;

            // Trouver l'utilisateur par email
            const user = await User.findOne({ where: { email } });
            if (!user) {
                return res.status(404).json({ message: 'Utilisateur non trouvé.' });
            }

            // Envoyer le lien de réinitialisation du mot de passe
            await EmailsServices.sendLinkEmail(user);

            return res.status(200).json({ message: 'Email de réinitialisation envoyé.' });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Erreur lors de l\'envoi de l\'email de réinitialisation.' });
        }
    }
}

module.exports = new emailController();

