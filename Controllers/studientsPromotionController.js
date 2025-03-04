import StudientsPromotionService from "../services/studientsPromotionService.js";


class StudientsPromotionController {
    // Ajouter un étudiant à une promotion
    async addStudientToPromotion(req, res, next) {
        try {
            const { studient_id, promotion_id } = req.body;
            const newEntry = await StudientsPromotionService.addStudientToPromotion(studient_id, promotion_id);
            res.status(201).json({ message: "Étudiant ajouté à la promotion avec succès.", data: newEntry });
        } catch (error) {
            next(error);
        }
    }

    // Supprimer un étudiant d'une promotion
    async removeStudientFromPromotion(req, res, next) {
        try {
            const { studient_id, promotion_id } = req.params;
            const response = await StudientsPromotionService.removeStudientFromPromotion(studient_id, promotion_id);
            res.status(200).json(response);
        } catch (error) {
            next(error);
        }
    }
}

export default new StudientsPromotionController();
