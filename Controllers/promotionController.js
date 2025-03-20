import promotionService from '../services/promotionService.js';
import { CustomError } from '../errors/customError.js';

class PromotionController {
    async getAllPromotions(req, res, next) {
        try {
            const promotions = await promotionService.getAllPromotions();
            res.json(promotions);
        } catch (error) {
            next(new CustomError("Une erreur est survenue lors de la récupération des promotions.", 500));
        }
    }

    async getPromotionById(req, res, next) {
        const { promotionId } = req.params;
        try {
            const promotion = await promotionService.getPromotionById(promotionId);
            if (!promotion) {
                throw new CustomError("Promotion non trouvée.", 404);
            }
            res.json(promotion);
        } catch (error) {
            next(new CustomError("Une erreur est survenue lors de la récupération de la promotion.", 500));
        }
    }

    async addPromotion(req, res, next) {

        const { title, training_id, students, trainers, supervisors, modules, start_date, end_date } = req.body;
        try {
            if (!title || !training_id) {
                throw new CustomError("Titre et formation obligatoires.", 400);
            }
            //vérifier si le nom de la formation existe déjà
            const existingPromotion = await promotionService.getPromotionByTitle(title);
            if (existingPromotion.length > 0) {
                throw new CustomError("Une promotion avec le même nom existe déjà.", 400);
            }

            const promotionData = { title, training_id, start_date, end_date};

            const newPromotion = await promotionService.addPromotion(promotionData, students, trainers, supervisors, modules);
            res.status(201).json(newPromotion);
        } catch (error) {
            next(error);
        }
    }

    async updatePromotion(req, res, next) {
        const { promotionId } = req.params;
        const { title, start_date, end_date} = req.body;
        try {
            // Validation des données d'entrée
            if (!title) {
                throw new CustomError("Titre et formation obligatoires.", 400);
            }

            const promotionData = { title, start_date, end_date};

            await promotionService.updatePromotion(promotionId, promotionData);
            res.status(200).json({ message: `Promotion ${title} mise à jour.` });
        } catch (error) {
            next(error)
        }
    }

    async deletePromotion(req, res, next) {
        const { promotionId } = req.params;
        try {
            const existingUserPromotion = await promotionService.findPromotion(promotionId);

            if (
                existingUserPromotion.studients.length > 0 ||
                existingUserPromotion.trainers.length > 0 ||
                existingUserPromotion.supervisors.length > 0
            ) {
                throw new CustomError("Cette promotion contient un ou plusieurs utilisateurs.", 400);
            }


            await promotionService.deletePromotion(promotionId);
            res.status(200).json({ message: "Promotion supprimée." });

        } catch (error) {
            next(error);
        }
    }

    async getPromotionByTrainingId(req, res, next) {
        const { trainingId } = req.params;
        try {
            const promotions = await promotionService.getPromotionByTrainingId(trainingId);
            res.status(200).json(promotions);
        } catch (error) {
            next(error)
        }
    }
}

export default new PromotionController();
