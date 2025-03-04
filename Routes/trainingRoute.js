import { Router } from 'express';
const router = Router();
import TrainingController from '../controllers/trainingController.js';

router.get('/', (req, res, next) => TrainingController.getAllTrainings(req, res, next));
router.get('/:trainingId', (req, res, next) => TrainingController.getTrainingById(req, res, next));
router.post('/' ,(req, res, next) => TrainingController.addTrainingWithModules(req, res, next));
router.patch('/:trainingId', (req, res, next) => TrainingController.updateTrainingById(req, res, next));

export default router;