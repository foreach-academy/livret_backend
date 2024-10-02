const EvaluationControl = require('../controllers/evaluationController');

const express = require('express');
const { getStudentsEvaluations } = require('../services/evaluationService');

const router = express.Router();


router.get('/', (req, res) => EvaluationControl.getAllEvaluation(req, res));
router.post('/', (req, res) => EvaluationControl.addEvaluation(req, res));

module.exports = router;