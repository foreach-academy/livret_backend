import Promotion from '../models/promotion.js';
import Training from '../models/training.js';
import User from "../models/user.js";
import StudientsPromotion from "../models/studientsPromotion.js";
import SupervisorsPromotion from "../models/supervisorsPromotion.js";
import TrainersPromotion from "../models/trainersPromotion.js"

class promotionService {
    // récupérer toutes les promotions
    async getAllPromotions() {
        return await Promotion.findAll();
    }

    // récupérer une promotion par ID
    async getPromotionById(promotionId) {
        return await Promotion.findByPk(promotionId, {
            include: [
                {
                    model: Training,
                    as: 'promotionTraining',  // Assure-toi que cet alias correspond à celui défini dans tes relations
                    attributes: ['id', 'title', 'description']
                },
                {
                    model: StudientsPromotion,
                    as: 'promotionStudents',  // Assure-toi que cet alias est défini dans tes relations
                    include: [
                        {
                            model: User,
                            as: 'studentUser',
                            attributes: ['id', 'firstname', 'lastname', 'email', 'promo', 'birthdate']
                        }
                    ]
                },
                {
                    model: SupervisorsPromotion,
                    as: 'promotionSupervisors',  // Assure-toi que cet alias est correct
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
                    as: 'promotionTrainers',  // Assure-toi que cet alias est correct
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
    
        
        // faire une jointure avec la table training trainer supervisor module

      
// REQUETE SQL CAR JE NE SAIS PAS FAIRE SUR SEQUELIEZ 
// SELECT 
//     promotion.id AS promotion_id,
//     promotion.title AS promotion_title,
//     training.id AS training_id,
//     training.title AS training_title,
//     training.description AS training_description,
//     "user".id AS studient_id,
//     "user".firstname AS studient_firstname,
//     "user".lastname AS studient_lastname,
//     "user".email AS studient_email,
//     "user".promo AS studient_promo,
//     "user".birthdate AS studient_birthdate,
//     supervisor_user.id AS supervisor_id,
//     supervisor_user.firstname AS supervisor_firstname,
//     supervisor_user.lastname AS supervisor_lastname,
//     supervisor_user.email AS supervisor_email,
//     trainer_user.id AS trainer_id,
//     trainer_user.firstname AS trainer_firstname,
//     trainer_user.lastname AS trainer_lastname,
//     trainer_user.email AS trainer_email

// FROM promotion

// LEFT JOIN training ON promotion.training_id = training.id

// LEFT JOIN studients_promotion ON promotion.id = studients_promotion.promotion_id
// LEFT JOIN "user" ON studients_promotion.studient_id = "user".id

// LEFT JOIN supervisors_promotion ON promotion.id = supervisors_promotion.promotion_id
// LEFT JOIN "user" AS supervisor_user ON supervisors_promotion.supervisor_id = supervisor_user.id

// LEFT JOIN trainers_promotion ON promotion.id = trainers_promotion.promotion_id
// LEFT JOIN "user" AS trainer_user ON trainers_promotion.trainer_id = trainer_user.id

// WHERE promotion.id = ?;



    // ajouter une  promotion
    async addPromotion(promotionData) {
        return await Promotion.create(promotionData);
    }

    // mttre à jour une promotion ( titre + training)
    async updatePromotion(promotionId, promotionData) {
        const promotion = await Promotion.findByPk(promotionId);
        if (!promotion) {
            throw new Error('Promotion non trouvée');
        }
        return await promotion.update(promotionData);
    }

    // supprimer une promotion
    async deletePromotion(promotionId) {
        return await Promotion.destroy({
            where: {
                id: promotionId
            }
        });
    }
}
export default new promotionService();