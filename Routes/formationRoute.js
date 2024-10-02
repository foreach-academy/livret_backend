const FormationControl = require('../controllers/formationController');
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => FormationControl.getAllFormation(req, res));
router.post('/' ,(req, res) => FormationControl.addFormation(req, res));
// router.get('/:id/users', (req, res) => FormationControl.getUsersByFormationId(req, res));
router.get('/:formationId/:moduleId', (req, res) => FormationControl.getStudentsEvaluationsByFormationAndModule(req, res));


module.exports = router;