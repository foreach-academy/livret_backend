const express = require('express');

const roleController = require('../controllers/roleController');

const router = express.Router();


router.get('/', (req, res) => roleController.getAllRole(req,res));
router.get('/:id', (req, res) => roleController.getRoleById(req, res));
router.post('/', (req, res) => roleController.addRole(req,res));

module.exports = router;