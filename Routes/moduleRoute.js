import ModuleControl from '../controllers/moduleController.js';
import { Router } from 'express';
const router = Router();

router.get('/', (req, res) => ModuleControl.getAllModules(req,res));
router.get('/:moduleId', (req, res) => ModuleControl.getModuleById(req, res));
router.post('/', (req, res) => ModuleControl.addModule(req, res));
router.put('/:moduleId', (req, res) => ModuleControl.updateModule(req, res));
router.delete('/:moduleId', (req, res) => ModuleControl.deleteModule(req, res));

export default router;