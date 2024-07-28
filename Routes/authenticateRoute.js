const express = require('express');
const router = express.Router();

const authenticateController = require('../Controllers/authenticateController');


router.post('/login', (req, res) =>  authenticateController.login(req,res));
router.post('/register', (req, res) => authenticateController.register(req,res));


module.exports = router;