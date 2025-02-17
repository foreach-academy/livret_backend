import Promotion from '../models/promotion.js';
import Training from '../models/training.js';
import User from "../models/user.js";
import StudientsPromotion from "../models/studientsPromotion.js";
import SupervisorsPromotion from "../models/supervisorsPromotion.js";
import TrainersPromotion from "../models/trainersPromotion.js";

class PromotionService {
    // Récupérer toutes les promotions
    async getAllPromotions() {
        return await Promotion.findAll();
    }

    //  Récupérer une promotion par ID avec jointures
    async getPromotionById(promotionId) {
        return await Promotion.findByPk(promotionId, {
            include: [
                {
                    model: Training,
                    as: 'training',  
                    attributes: ['id', 'title', 'description']
                },
                {
                    model: StudientsPromotion,
                    as: 'promotionStudients',  
                    include: [
                        {
                            model: User,
                            as: 'studientUser', 
                            attributes: ['id', 'firstname', 'lastname', 'email', 'birthdate']
                        }
                    ]
                },
                {
                    model: SupervisorsPromotion,
                    as: 'promotionSupervisors',
                    include: [
                        {
                            model: User,
                            as: 'supervisorUser',
                            attributes: ['id', 'firstname', 'lastname', 'email']
                        }
                    ]
                },
                {
                    model: TrainersPromotion,
                    as: 'promotionTrainers',
                    include: [
                        {
                            model: User,
                            as: 'trainerUser',
                            attributes: ['id', 'firstname', 'lastname', 'email']
                        }
                    ]
                }
            ]
        });
    }

    //  Ajouter une promotion
    async addPromotion(promotionData) {
        return await Promotion.create(promotionData);
    }

    //  Mettre à jour une promotion (titre + training)
    async updatePromotion(promotionId, promotionData) {
        const promotion = await Promotion.findByPk(promotionId);
        if (!promotion) {
            throw new Error('Promotion non trouvée');
        }
        return await promotion.update(promotionData);
    }

    //  Supprimer une promotion
    async deletePromotion(promotionId) {
        return await Promotion.destroy({
            where: {
                id: promotionId
            }
        });
    }
}

export default new PromotionService();
