import SupervisorsPromotion from "../models/supervisorsPromotion.js";
import { CustomError } from "../errors/customError.js";

class SupervisorsPromotionService {
    // Ajouter un superviseur à une promotion
    async addSupervisorToPromotion(supervisor_id, promotion_id) {
        if (!supervisor_id || !promotion_id) {
            throw new CustomError("supervisor_id et promotion_id sont requis.", 400);
        }

        // Vérifier si le superviseur est déjà dans la promotion
        const existingEntry = await SupervisorsPromotion.findOne({ 
            where: { supervisor_id, promotion_id } 
        });

        if (existingEntry) {
            throw new CustomError("Ce responsable est déjà dans cette promotion.", 400);
        }

        // Ajouter le superviseur à la promotion
        return await SupervisorsPromotion.create({ supervisor_id, promotion_id });
    }

    // Supprimer un superviseur d'une promotion
    async removeSupervisorFromPromotion(supervisor_id, promotion_id) {
        if (!supervisor_id || !promotion_id) {
            throw new CustomError("supervisor_id et promotion_id sont requis.", 400);
        }

        const deleted = await SupervisorsPromotion.destroy({ 
            where: { supervisor_id, promotion_id } 
        });

        if (!deleted) {
            throw new CustomError("Le responsable n'a pas été trouvé dans cette promotion.", 404);
        }

        return { message: "Responsable supprimé de la promotion avec succès." };
    }
}

export default new SupervisorsPromotionService();
