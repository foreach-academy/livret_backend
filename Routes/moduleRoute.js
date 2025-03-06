import ModuleControl from '../controllers/moduleController.js';
import { Router } from 'express';
const router = Router();

router.get('/', (req, res, next) => ModuleControl.getAllModules(req,res, next));
router.get('/:moduleId', (req, res, next) => ModuleControl.getModuleById(req, res, next));
router.post('/', (req, res, next) => ModuleControl.addModule(req, res, next));
router.put('/:moduleId', (req, res, next) => ModuleControl.updateModule(req, res, next));
router.delete('/:moduleId', (req, res, next) => ModuleControl.deleteModule(req, res, next));
router.get('/training/:trainingId', (req, res, next) => ModuleControl.getModulesByTraining(req, res, next))

export default router;