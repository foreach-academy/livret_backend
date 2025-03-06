import { Router } from 'express';
const router = Router();
import promotionController from '../controllers/promotionController.js';

router.get('/', (req, res, next) => promotionController.getAllPromotions(req, res, next));
router.get('/:promotionId', (req, res, next) => promotionController.getPromotionById(req, res, next));
router.post('/', (req, res, next) => promotionController.addPromotion(req, res, next));
router.patch('/:promotionId', (req, res, next) => promotionController.updatePromotion(req, res, next));
router.delete('/:promotionId', (req, res, next,) => promotionController.deletePromotion(req, res, next));
router.get('/promoByTraining/:trainingId', (req, res, next) => promotionController.getPromotionByTrainingId(req,res, next));

export default router;