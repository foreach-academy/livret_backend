import SupervisorsPromotionService from "../services/supervisorsPromotionService.js";
import { CustomError } from "../errors/customError.js";

class SupervisorsPromotionController {
    // Ajouter un superviseur à une promotion
    async addSupervisorToPromotion(req, res, next) {
        try {
            const { supervisor_id, promotion_id } = req.body;
            const newEntry = await SupervisorsPromotionService.addSupervisorToPromotion(supervisor_id, promotion_id);
            res.status(201).json({ message: "Superviseur ajouté à la promotion avec succès.", data: newEntry });
        } catch (error) {
            next(error);
        }
    }

    // Supprimer un superviseur d'une promotion
    async removeSupervisorFromPromotion(req, res, next) {
        try {
            const { supervisor_id, promotion_id } = req.params;
            const response = await SupervisorsPromotionService.removeSupervisorFromPromotion(supervisor_id, promotion_id);
            res.status(200).json(response);
        } catch (error) {
            next(error);
        }
    }
}

export default new SupervisorsPromotionController();
