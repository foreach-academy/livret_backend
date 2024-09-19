const express = require('express');

const userController = require('../Controllers/userController');
const authGuard = require('../middleware/authGuard');
const router = express.Router();

router.get('/', (req, res) => userController.getAllUser(req,res));
router.get('/:id', (req, res) => userController.getUserById(req,res));
router.get('/role/:roleName', (req, res) => userController.getUserByRole(req, res));
router.post('/', authGuard, (req, res) => userController.addUser(req,res));
router.patch('/', authGuard, (req, res) => userController.updateUser(req, res));
router.delete('/', authGuard, (req, res) => userController.deleteUser(req, res));



module.exports = router;