const EvaluationControl = require('../Controllers/evaluationController');
const express = require('express');
const router = express.Router();
const authGuard = require('../middleware/authGuard');

router.get('/', (req, res) => EvaluationControl.getAllEvaluation(req, res));
router.post('/', (req, res) => EvaluationControl.addEvaluation(req, res));
router.patch('/:evaluationId', authGuard, (req, res) => EvaluationControl.editEvaluation(req, res));

module.exports = router;