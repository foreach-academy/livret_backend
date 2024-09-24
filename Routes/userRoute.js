const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController');
const authGuard = require('../middleware/authGuard');

router.get('/', authGuard, (req, res) => userController.getAllUser(req,res));
router.get('/:id', (req, res) => userController.getUserById(req,res));
router.get('/role/:roleName', (req, res) => userController.getUserByRole(req, res));
router.post('/', authGuard, (req, res) => userController.addUser(req,res));
router.patch('/:id', authGuard, (req, res) => userController.updateUser(req, res));
router.delete('/:id', authGuard, (req, res) => userController.deleteUser(req, res));



module.exports = router;