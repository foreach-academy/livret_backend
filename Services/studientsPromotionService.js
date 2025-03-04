import StudientsPromotion from "../models/studientsPromotion.js";
import { CustomError } from "../errors/customError.js";

class StudientsPromotionService {
    // Ajouter un étudiant à une promotion
    async addStudientToPromotion(studient_id, promotion_id) {
        if (!studient_id || !promotion_id) {
            throw new CustomError("studient_id et promotion_id sont requis.", 400);
        }

        // Vérifier si l'étudiant est déjà dans la promotion
        const existingEntry = await StudientsPromotion.findOne({ 
            where: { studient_id, promotion_id } 
        });

        if (existingEntry) {
            throw new CustomError("Cet étudiant est déjà dans cette promotion.", 400);
        }

        // Ajouter l'étudiant à la promotion
        return await StudientsPromotion.create({ studient_id, promotion_id });
    }

    // Supprimer un étudiant d'une promotion
    async removeStudientFromPromotion(studient_id, promotion_id) {
        if (!studient_id || !promotion_id) {
            throw new CustomError("studient_id et promotion_id sont requis.", 400);
        }

        const deleted = await StudientsPromotion.destroy({ 
            where: { studient_id, promotion_id } 
        });

        if (!deleted) {
            throw new CustomError("L'étudiant n'a pas été trouvé dans cette promotion.", 404);
        }

        return { message: "Étudiant supprimé de la promotion avec succès." };
    }
}

export default new StudientsPromotionService();
