import { Router } from 'express';
const router = Router();
import FormationController from '../controllers/formationController.js';

router.get('/', (req, res) => FormationController.getAllFormations(req, res));
router.get('/:formationId', (req, res) => FormationController.getFormationById(req, res));
router.post('/' ,(req, res) => FormationController.addFormation(req, res));

export default router;