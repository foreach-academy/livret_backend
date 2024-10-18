const express = require('express');
const router = express.Router();

const userController = require('../Controllers/userController');
const authGuard = require('../middleware/authGuard');

router.get('/', authGuard, (req, res) => userController.getAllUser(req,res));
router.get('/:id', (req, res) => userController.getUserById(req,res));
router.get('/role/:roleName', (req, res) => userController.getUserByRole(req, res));
router.post('/', authGuard, (req, res) => userController.addUser(req,res));
router.post('/reset-password', (req, res) => userController.updateUserByToken(req,res));
router.patch('/update/:id', authGuard, (req, res) => userController.updateUser(req, res));
router.delete('/:id', authGuard, (req, res) => userController.deleteUser(req, res));



module.exports = router;