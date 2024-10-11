

const express = require('express');
const EmailController = require('../controllers/EmailControllers'); 
const {passwordResetLimiter} = require('../middleware/ResetPasswordRateLimiter');

const router = express.Router();

// Route pour demander la réinitialisation du mot de passe
router.post('/request-password-reset',passwordResetLimiter, EmailController.requestPasswordReset.bind(EmailController));

module.exports = router;
