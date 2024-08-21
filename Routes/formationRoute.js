const FormationControl = require('../Controllers/formationController');
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => FormationControl.getAllFormation(req, res));
router.get('/:id', (req, res) => FormationControl.getFormationById(req, res));
router.post('/' ,(req, res) => FormationControl.addFormation(req, res));


module.exports = router;