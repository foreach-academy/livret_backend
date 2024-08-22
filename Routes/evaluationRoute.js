const EvaluationControl = require('../Controllers/evaluationController');

const express = require('express');

const router = express.Router();


router.get('/', (req, res) => EvaluationControl.getAllEvaluation(req, res));
router.get('/:id', (req, res) => EvaluationControl.getEvaluationById(req, res));
router.post('/', (req, res) => EvaluationControl.addEvaluation(req, res));


module.exports = router;