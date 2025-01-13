import EvaluationResultatsController from '../controllers/evaluationResultatsController.js'
import { Router } from 'express';
const router = Router();

router.get('/', (req, res) => EvaluationResultatsController.getAllEvaluationResultats(req, res))

export default router;