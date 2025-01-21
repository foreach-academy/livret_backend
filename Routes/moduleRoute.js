import ModuleControl from '../controllers/moduleController.js';
import { Router } from 'express';
const router = Router();

router.get('/', (req, res) => ModuleControl.getAllModules(req,res));
router.get('/:moduleId', (req, res) => ModuleControl.getModuleById(req, res));

export default router;