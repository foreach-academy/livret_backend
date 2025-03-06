
import ModulePromotionService from '../services/modulePromotionService.js';

class ModulePromotionControl  {

    async updateModulePromotion(req, res, next) {
        try {
            const { promotion_id, module_id, trainer_id, start_date, end_date } = req.body;

            if (!promotion_id || !module_id || !trainer_id || !start_date || !end_date) {
                return res.status(400).json({ message: "Tous les champs sont requis." });
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
            console.log("Requête reçue avec body :", req.body); // ✅ DEBUG
            const { promotion_id, module_id, trainer_id, start_date, end_date } = req.body;
     

            // Vérification des champs requis
            if (!promotion_id || !module_id || !trainer_id || !start_date || !end_date) {
                return res.status(400).json({ message: "Tous les champs sont requis." });
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
}

export default new ModulePromotionControl;
