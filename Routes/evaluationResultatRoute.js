const express = require('express');
const EvaluationResultat = require('../Models/evaluation_resultat');
const router = express.Router();
const EvaluationResultatsController = require('../Controllers/EvaluationResultatsController')

router.get('/', (req, res) => EvaluationResultatsController.getAllEvaluationResultats(req, res))

module.exports = router;