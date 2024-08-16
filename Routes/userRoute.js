const express = require('express');

const userController = require('../Controllers/userController');

const router = express.Router();

router.get('/', (req, res) => userController.getAllUser(req,res));
router.get('/:id', (req, res) => userController.getUserByid(req,res));
router.post('/', (req, res) => userController.addUser(req,res));
router.get('/role/roleName', (res, req) => userController.getUserByRole(req, res));


module.exports = router;