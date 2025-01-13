import FormationModuleController from '../controllers/formationModuleController.js';
import { Router } from 'express';
const router = Router();

router.get('/', (req, res) => FormationModuleController.getAllFormationModule(req, res));
router.get('/:id', (req, res) => FormationModuleController.getFormationModuleById(req, res));
router.post('/', (req, res) => FormationModuleController.addFormationModule(req, res));

export default router;