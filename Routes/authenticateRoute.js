const express = require('express');
const router = express.Router();

const authenticateController = require('../Controllers/authenticateController');
const authGuard = require('../Controllers/authGuard');

router.post('/login', (req, res) =>  authenticateController.login(req,res));
router.post('/register', (req, res) => authenticateController.register(req,res));

router.get('/protectedRoute', authGuard, (req, res) => {
    res.status(200).json({ message: 'This is a protected route', userId: req.userId });
});

module.exports = router;