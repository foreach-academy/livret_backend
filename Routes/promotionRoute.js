import { Router } from 'express';
const router = Router();
import promotionController from '../controllers/promotionController.js';

router.get('/', (req, res) => promotionController.getAllPromotions(req, res));
router.get('/:promotionId', (req, res) => promotionController.getPromotionById(req, res));
router.post('/', (req, res) => promotionController.addPromotion(req, res));
router.patch('/:promotionId', (req, res) => promotionController.updatePromotion(req, res));
router.delete('/:promotionId', (req, res) => promotionController.deletePromotion(req, res));

export default router;