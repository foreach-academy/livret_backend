import Evaluation from "../models/evaluation.js";
import Module from "../models/module.js";
import ModulePromotion from "../models/modulePromotion.js";
import Promotion from "../models/promotion.js";
import User from "../models/user.js";


class ModulePromotionService {

    async updateModulePromotion({ promotion_id, module_id, trainer_id, start_date, end_date }) {
        try {
            const [updatedRows] = await ModulePromotion.update(
                { trainer_id, start_date, end_date },
                { where: { promotion_id, module_id } }
            );

            if (updatedRows === 0) {
                throw new Error("Aucune mise à jour effectuée. Vérifiez les identifiants fournis.");
            }

            return { message: "Module mis à jour avec succès." };
        } catch (error) {
            throw new Error(`Erreur lors de la mise à jour du module : ${error.message}`);
        }
    }
    async addModulePromotion({ promotion_id, module_id, trainer_id, start_date, end_date }) {
        try {
            const newModulePromotion = await ModulePromotion.create({
                promotion_id,
                module_id,
                trainer_id,
                start_date,
                end_date
            });

            return newModulePromotion;
        } catch (error) {
            throw new Error(`Erreur lors de l'ajout du module à la promotion : ${error.message}`);
        }
    }
    async getModuleOfPromotion(promotionId) {
        try {
            const modules = await ModulePromotion.findAll({
                where: { promotion_id: promotionId },
                include: [
                    { model: Module, as:'moduleInfo', attributes: ['id', 'title'] },
                    { model: User, as: 'trainerInfo', attributes: ['id', 'firstname', 'lastname'] }
                ]
            });
    
            if (!modules || modules.length === 0) {
                throw new Error("Aucun module trouvé pour cette promotion.");
            }
    
            return modules;
        } catch (error) {
            throw new Error(`Erreur lors de la récupération des modules de promotion : ${error.message}`);
        }
    }
    
};

export default new ModulePromotionService;
