
import { CustomError } from '../errors/customError.js';
import ModulePromotionService from '../services/modulePromotionService.js';

class ModulePromotionControl  {

    async updateModulePromotion(req, res, next) {
        try {
            const { promotion_id, module_id, trainer_id, start_date, end_date } = req.body;
            if (!promotion_id || !module_id || !trainer_id || !start_date || !end_date) {
                throw new CustomError("Tous les champs sont requis.", 400);

            }

            const updatedModule = await ModulePromotionService.updateModulePromotion({
                promotion_id,
                module_id,
                trainer_id,
                start_date,
                end_date
            });

            return res.status(200).json(updatedModule);
        } catch (error) {
            console.error("Erreur lors de la mise à jour du module :", error);
            next(error);
        }
    }


    async addModulePromotion(req, res, next) {
        try {
            const { promotion_id, module_id, trainer_id, start_date, end_date } = req.body;
     

            // Vérification des champs requis
            if (!promotion_id || !module_id || !trainer_id || !start_date || !end_date) {
                throw new CustomError("Tous les champs sont requis." , 400)
            }

            // Appel du service pour ajouter le module à la promotion
            const newModulePromotion = await ModulePromotionService.addModulePromotion({
                promotion_id,
                module_id,
                trainer_id,
                start_date,
                end_date
            });

            return res.status(201).json(newModulePromotion);
        } catch (error) {
            console.error("Erreur lors de l'ajout du module à la promotion :", error);
            next(error)
        }
    }
    async getModuleOfPromotion(req, res, next) {
        try {
            const promotionId = req.params.promotionId;

            if (!promotionId) {
                throw new CustomError("ID de promotion requis.", 400)
            }

            const module = await ModulePromotionService.getModuleOfPromotion(promotionId);

            if (!module) {
                throw new CustomError("Module de promotion non trouvé" , 404)
            }

            return res.status(200).json(module);
            
        } catch (error) {
            next(error)
        }
    }
}

export default new ModulePromotionControl;
