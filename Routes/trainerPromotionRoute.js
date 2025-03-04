import express from "express";
import TrainersPromotionController from "../controllers/trainersPromotionController.js";

const router = express.Router();

router.post("/",(req, res, next) => TrainersPromotionController.addTrainerToPromotion(req, res, next));
router.delete("/:trainer_id/:promotion_id",(req, res, next) => TrainersPromotionController.removeTrainerFromPromotion(req, res, next));

export default router;
