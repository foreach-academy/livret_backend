const FormationControl = require('../Controllers/formationController');
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => FormationControl.getAllFormation(req, res));
router.post('/' ,(req, res) => FormationControl.addFormation(req, res));
router.get('/:formationId/:moduleId', (req, res) => FormationControl.getStudentsEvaluationsByFormationAndModule(req, res));
router.get('/:formationId', (req, res) => FormationControl.getModulesByFormationId(req, res));
router.get('/:formationId/formateur/:formateurId', (req, res) => FormationControl.getModulesByFormationIdAndFormateurId(req, res));

module.exports = router;