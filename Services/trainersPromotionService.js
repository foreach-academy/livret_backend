import TrainersPromotion from "../models/trainersPromotion.js";
import { CustomError } from "../errors/customError.js";

class TrainersPromotionService {
    // Ajouter un formateur à une promotion
    async addTrainerToPromotion(trainer_id, promotion_id) {
        if (!trainer_id || !promotion_id) {
            throw new CustomError("trainer_id et promotion_id sont requis.", 400);
        }

        // Vérifier si le formateur est déjà dans la promotion
        const existingEntry = await TrainersPromotion.findOne({ 
            where: { trainer_id, promotion_id } 
        });

        if (existingEntry) {
            throw new CustomError("Ce formateur est déjà dans cette promotion.", 400);
        }

        // Ajouter le formateur à la promotion
        return await TrainersPromotion.create({ trainer_id, promotion_id });
    }

    // Supprimer un formateur d'une promotion
    async removeTrainerFromPromotion(trainer_id, promotion_id) {
        if (!trainer_id || !promotion_id) {
            throw new CustomError("trainer_id et promotion_id sont requis.", 400);
        }

        const deleted = await TrainersPromotion.destroy({ 
            where: { trainer_id, promotion_id } 
        });

        if (!deleted) {
            throw new CustomError("Le formateur n'a pas été trouvé dans cette promotion.", 404);
        }

        return { message: "Formateur supprimé de la promotion avec succès." };
    }
}

export default new TrainersPromotionService();
