// /routes/emailRoutes.js

const express = require('express');
const EmailController = require('../controllers/EmailControllers'); 

const router = express.Router();

// Route pour demander la réinitialisation du mot de passe
router.post('/request-password-reset', EmailController.requestPasswordReset.bind(EmailController));

module.exports = router;
