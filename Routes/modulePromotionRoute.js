import { Router } from 'express';
import ModulePromotionController from '../controllers/modulePromotionController.js';

const router = Router();

router.patch('/', (req, res, next) => ModulePromotionController.updateModulePromotion(req, res, next));

router.post('/', (req, res, next) => ModulePromotionController.addModulePromotion(req, res, next));

export default router;
