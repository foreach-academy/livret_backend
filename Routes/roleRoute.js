import { Router } from 'express';
import roleController from '../controllers/roleController.js';

const router = Router();

router.get('/', (req, res, next) => roleController.getAllRoles(req,res, next));

export default router;