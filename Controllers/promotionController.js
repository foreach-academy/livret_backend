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
                return next(new CustomError("Promotion non trouvée.", 404));
            }
            res.json(promotion);
        } catch (error) {
            next(new CustomError("Une erreur est survenue lors de la récupération de la promotion.", 500));
        }
    }

    async addPromotion(req, res, next) {
        console.log("Données reçues:", req.body); // 👀 Vérifier ce qui est envoyé

        const { title, training_id, students, trainers, supervisors } = req.body;
        try {
            if (!title || !training_id) {
                return next(new CustomError("Titre et formation obligatoires.", 400));
            }

            const promotionData = { title, training_id };

            const newPromotion = await promotionService.addPromotion(promotionData, students, trainers, supervisors);
            res.status(201).json(newPromotion);
        } catch (error) {
            next(new CustomError("Une erreur est survenue lors de l'ajout de la promotion.", 500));
        }
    }

    async updatePromotion(req, res, next) {
        const { promotionId } = req.params;
        const { title, training_id } = req.body;
        try {
            // Validation des données d'entrée
            if (!title && !training_id) {
                return next(new CustomError("Titre et formation obligatoires.", 400));
            }

            const promotionData = { title, training_id };

            await promotionService.updatePromotion(promotionId, promotionData);
            res.status(200).json({ message: "Promotion mise à jour." });
        } catch (error) {
            next(new CustomError("Une erreur est survenue lors de la mise à jour de la promotion.", 500));
        }
    }

    async deletePromotion(req, res, next) {
        const { promotionId } = req.params;
        try {
            await promotionService.deletePromotion(promotionId);
            res.status(200).json({ message: "Promotion supprimée." });
        } catch (error) {
            next(new CustomError("Une erreur est survenue lors de la suppression de la promotion.", 500));
        }
    }

    async getPromotionByTrainingId(req, res, next) {
        const { trainingId } = req.params;
        try {
            const promotions = await promotionService.getPromotionByTrainingId(trainingId);
            res.status(200).json(promotions);
        } catch (error) {
            next(new CustomError("Une erreur est survenue lors de la récupération des promotions liées à une formation.", 500));
        }
    }
}

export default new PromotionController();
