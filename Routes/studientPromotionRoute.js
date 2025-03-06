import express from "express";
import StudientsPromotionController from "../controllers/studientsPromotionController.js";

const router = express.Router();

router.post("/",(req, res, next) => StudientsPromotionController.addStudientToPromotion(req, res, next));
router.delete("/:studient_id/:promotion_id",(req, res, next) => StudientsPromotionController.removeStudientFromPromotion(req, res, next));

export default router;
