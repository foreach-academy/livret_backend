import { Router } from 'express';
import ModulePromotionController from '../controllers/modulePromotionController.js';

const router = Router();
router.get('/:promotionId', (req, res, next) =>  ModulePromotionController.getModuleOfPromotion(req, res, next));

router.patch('/', (req, res, next) => ModulePromotionController.updateModulePromotion(req, res, next));

router.post('/', (req, res, next) => ModulePromotionController.addModulePromotion(req, res, next));

export default router;
