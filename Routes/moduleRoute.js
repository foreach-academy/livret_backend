const ModuleControl = require('../Controllers/moduleController');
const express = require('express')
const router = express.Router();

router.get('/', (req, res) => ModuleControl.getAllModule(req,res));
router.get('/:moduleId', (req, res) => ModuleControl.getModuleById(req, res));
router.post('/', (req, res) => ModuleControl.addModule(req, res));


module.exports = router;