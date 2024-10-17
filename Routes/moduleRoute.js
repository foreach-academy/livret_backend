const ModuleControl = require('../controllers/moduleController');
const express = require('express')
const router = express.Router();

router.get('/', (req, res) => ModuleControl.getAllModule(req,res));
router.get('/:moduleId', (req, res) => ModuleControl.getModuleById(req, res));
// router.get('/:id', (req, res) => ModuleControl.getModuleById(req, res));
// router.get('/:formateurId', (req, res) => ModuleControl.getModulesByFormateurId(req, res));
router.post('/', (req, res) => ModuleControl.addModule(req, res));


module.exports = router;