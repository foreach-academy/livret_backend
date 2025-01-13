import ModuleControl from '../controllers/moduleController.js';
import { Router } from 'express';
const router = Router();

router.get('/', (req, res) => ModuleControl.getAllModule(req,res));
router.get('/:moduleId', (req, res) => ModuleControl.getModuleById(req, res));
router.post('/', (req, res) => ModuleControl.addModule(req, res));


export default router;