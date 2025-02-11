import { Router } from 'express';
const router = Router();
import authenticateController from '../controllers/authenticateController.js';
import BruteForceSecurity from '../middleware/BruteForceSecurity.js';

// Limiteur pour la connexion (login)
const loginLimiter = BruteForceSecurity({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 5, // Limite de 5 tentatives
    message: 'Trop de tentatives de connexion, veuillez réessayer dans quelques minutes.'
});


router.post('/login', (req, res) =>  authenticateController.login(req,res));
router.post('/subscribe', (req, res) =>  authenticateController.subscribe(req,res));
router.post('/reset-password', (req, res) => authenticateController.resetPassword(req,res));




export default router;