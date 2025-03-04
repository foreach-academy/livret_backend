
import EmailController from '../controllers/emailControllers.js'; 
import BruteForceSecurity from '../middleware/BruteForceSecurity.js';
import { Router } from 'express';
const router = Router();

// Limiteur pour la réinitialisation de mot de passe
const passwordResetLimiter = BruteForceSecurity({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 3, // Limite de 3 tentatives
    message: 'Trop de tentatives de réinitialisation de mot de passe, veuillez réessayer dans quelques minutes.'
});

// Route pour demander la réinitialisation du mot de passe
router.post('/request-password-reset', passwordResetLimiter, (req, res, next) => EmailController.requestPasswordReset(req, res, next));

export default router;
