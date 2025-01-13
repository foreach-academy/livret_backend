import EvaluationController from '../controllers/evaluationController.js';
import { Router } from 'express';
const router = Router();
import authGuard from '../middleware/authGuard.js';

router.get('/', (req, res) => EvaluationController.getAllEvaluation(req, res));
router.post('/', (req, res) => EvaluationController.addEvaluation(req, res));
router.patch('/:evaluationId', authGuard, (req, res) => EvaluationController.editEvaluation(req, res));

export default router;