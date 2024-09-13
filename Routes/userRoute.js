const express = require('express');
const authGuard = require('../middleware/authGuard');

const userController = require('../Controllers/userController');
const router = express.Router();

router.get('/', (req, res) => userController.getAllUser(req,res));
router.get('/:id', (req, res) => userController.getUserById(req,res));
router.post('/', authGuard.adminGuard, (req, res) => userController.addUser(req,res));
router.get('/role/:roleName', (req, res) => userController.getUserByRole(req, res));

// Route pour la fonction d'ajouter un utilisateur en étant un administrateur à réactiver si besoin

// router.post('/', authGuard.adminGuard, (req, res) => userController.createUserByAdmin(req,res));

module.exports = router;