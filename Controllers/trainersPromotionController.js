import TrainersPromotionService from "../services/trainersPromotionService.js";
import { CustomError } from "../errors/customError.js";

class TrainersPromotionController {
    // Ajouter un formateur à une promotion
    async addTrainerToPromotion(req, res, next) {
        try {
            const { trainer_id, promotion_id } = req.body;
            const newEntry = await TrainersPromotionService.addTrainerToPromotion(trainer_id, promotion_id);
            res.status(201).json({ message: "Formateur ajouté à la promotion avec succès.", data: newEntry });
        } catch (error) {
            next(error);
        }
    }

    // Supprimer un formateur d'une promotion
    async removeTrainerFromPromotion(req, res, next) {
        try {
            const { trainer_id, promotion_id } = req.params;
            const response = await TrainersPromotionService.removeTrainerFromPromotion(trainer_id, promotion_id);
            res.status(200).json(response);
        } catch (error) {
            next(error);
        }
    }
}

export default new TrainersPromotionController();
