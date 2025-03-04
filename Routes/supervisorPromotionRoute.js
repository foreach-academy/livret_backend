import express from "express";
import SupervisorsPromotionController from "../controllers/supervisorsPromotionController.js";

const router = express.Router();

router.post("/",(req, res, next) => SupervisorsPromotionController.addSupervisorToPromotion(req, res, next));
router.delete("/:supervisor_id/:promotion_id",(req, res, next) => SupervisorsPromotionController.removeSupervisorFromPromotion(req, res, next));

export default router;
