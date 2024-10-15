const EvaluationTypeControl = require('../Controllers/evaluation_typeController');

const express = require('express');
const router = express.Router();


router.get('/', (req, res) => EvaluationTypeControl.getAllEvaluationType(req, res));
router.get('/:moduleId', (req, res) => EvaluationTypeControl.getEvaluationTypeByModuleId(req, res));
router.post('/', (req, res) => EvaluationTypeControl.addEvaluationTypeToModule(req, res));
router.delete('/', (req, res) => EvaluationTypeControl.removeEvaluationTypeFromModule(req, res));
// router.get('/:id', (req, res) => EvaluationTypeControl.getEvaluationTypeById(req, res));
// router.post('/', (req, res) => EvaluationTypeControl.addEvaluationType(req, res));



module.exports= router;