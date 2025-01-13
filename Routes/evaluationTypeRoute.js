import EvaluationTypeController from '../controllers/evaluationTypeController.js';
import { Router } from 'express';
const router = Router();


router.get('/', (req, res) => EvaluationTypeController.getAllEvaluationType(req, res));
router.get('/:moduleId', (req, res) => EvaluationTypeController.getEvaluationTypeByModuleId(req, res));
router.post('/', (req, res) => EvaluationTypeController.addEvaluationTypeToModule(req, res));
router.delete('/', (req, res) => EvaluationTypeController.removeEvaluationTypeFromModule(req, res));




export default router;