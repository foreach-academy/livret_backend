const express = require('express');
const router = express.Router();
const authenticateController = require('../controllers/authenticateController');
const {BruteForceSecurity} = require('../middleware/BruteForceSecurity')

// Limiteur pour la connexion (login)
const loginLimiter = BruteForceSecurity({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 5, // Limite de 5 tentatives
    message: 'Trop de tentatives de connexion, veuillez réessayer dans quelques minutes.'
});


router.post('/login', loginLimiter, (req, res) =>  authenticateController.login(req,res));
router.post('/register', (req, res) => authenticateController.register(req,res));


module.exports = router;