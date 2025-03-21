import User from '../models/user.js'; 
import EmailsServices from '../services/emailServices.js'; 
import { CustomError } from '../errors/customError.js';

class EmailController {
    
    // Contrôleur pour envoyer le lien de réinitialisation du mot de passe
    async requestPasswordReset(req, res, next) {
  
        try {
            const  {email}  = req.body;
            if (!email) {
                throw new CustomError("L'email est requis.", 400);
            }

            const user = await User.findOne({ where: { email : email } });
            if (!user) {
                throw new CustomError("Utilisateur non trouvé.", 404);
            }

            // Envoyer le lien de réinitialisation du mot de passe
            await EmailsServices.sendLinkToResetPasswordEmail(user);

            return res.status(200).json({ message: "Email de réinitialisation envoyé." });
        } catch (error) {
            next(error)
        }
    }
}

export default new EmailController();
