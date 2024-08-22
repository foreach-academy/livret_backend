const Formation_ModuleControl = require('../Controllers/formation_moduleController');

const express = require('express');
const router = express.Router();

router.get('/', (req, res) => Formation_ModuleControl.getAllFormationModule(req, res));
router.get('/:id', (req, res) => Formation_ModuleControl.getFormationModuleById(req, res));
router.post('/', (req, res) => Formation_ModuleControl.addFormationModule(req, res));

module.exports = router;