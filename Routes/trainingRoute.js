import { Router } from 'express';
const router = Router();
import TrainingController from '../controllers/trainingController.js';

router.get('/', (req, res) => TrainingController.getAllTrainings(req, res));
router.get('/:trainingId', (req, res) => TrainingController.getTrainingById(req, res));
router.post('/' ,(req, res) => TrainingController.addTrainingWithModules(req, res));
router.patch('/:trainingId', (req, res) => TrainingController.updateTrainingById(req, res));

export default router;