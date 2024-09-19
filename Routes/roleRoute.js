const express = require('express');

const roleController = require('../controllers/roleController');

const router = express.Router();


router.get('/', (req, res) => roleController.getAllRole(req,res));
router.get('/:id', (req, res) => roleController.getRoleById(req, res));
router.post('/', (req, res) => roleController.addRole(req,res));
router.patch('/', (req, res) => roleController.updateRole(req,res));
router.delete('/', (req, res) => roleController.deleteRole(req,res));



module.exports = router;