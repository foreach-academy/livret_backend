import { Router } from 'express';
const router = Router();
import FormationController from '../controllers/formationController.js';

router.get('/', (req, res) => FormationController.getAllFormation(req, res));
router.post('/' ,(req, res) => FormationController.addFormation(req, res));
router.get('/:formationId/:moduleId', (req, res) => FormationController.getStudentsEvaluationsByFormationAndModule(req, res));
router.get('/:studentId/module/:moduleId', (req, res) => FormationController.getStudentEvaluationsByModule(req, res));
router.get('/:formationId', (req, res) => FormationController.getModulesByFormationId(req, res));
router.get('/:formationId/formateur/:formateurId', (req, res) => FormationController.getModulesByFormationIdAndFormateurId(req, res));

export default router;