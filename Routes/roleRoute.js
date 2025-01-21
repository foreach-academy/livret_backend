import { Router } from 'express';
import roleController from '../controllers/roleController.js';

const router = Router();

router.get('/', (req, res) => roleController.getAllRoles(req,res));

export default router;