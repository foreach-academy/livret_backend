import Promotion from '../models/promotion.js';
import Training from '../models/training.js';
import User from "../models/user.js";
import StudientsPromotion from "../models/studientsPromotion.js";
import SupervisorsPromotion from "../models/supervisorsPromotion.js";
import TrainersPromotion from "../models/trainersPromotion.js";
import ModulePromotion from '../models/modulePromotion.js';

class PromotionService {
    // Récupérer toutes les promotions
    async getAllPromotions() {
        return await Promotion.findAll();
    }

    async getPromotionByTrainingId(trainingId) {
        return await Promotion.findAll({
            where: { training_id : trainingId },
            include: [
                {
                    model: Training,
                    as: 'training',
                    attributes: ['id', 'title', 'description']
                }
            ]
        });
    }
    async getPromotionByTitle(title) {
        return await Promotion.findAll({ where: { title: title } });
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
 
    async addPromotion(promotionData, students, trainers, supervisors, modules) {
        try {
            // Vérifier si une promotion avec le même titre existe déjà
            const existingPromotion = await Promotion.findOne({
                where: { title: promotionData.title }
            });
    
            if (existingPromotion) {
                throw new Error(`Une promotion avec le titre "${promotionData.title}" existe déjà.`);
            }
    
            // Création de la promotion
            const promotion = await Promotion.create(promotionData);
            const promotionId = promotion.id;
    
            // Ajout des étudiants
            if (students && students.length > 0) {
                await StudientsPromotion.bulkCreate(
                    students.map(studient => ({
                        promotion_id: promotionId,
                        studient_id: studient.id
                    }))
                );
            }
    
            // Ajout des formateurs
            if (trainers && trainers.length > 0) {
                await TrainersPromotion.bulkCreate(
                    trainers.map(trainerId => ({
                        promotion_id: promotionId,
                        trainer_id: trainerId.id
                    }))
                );
            }
    
            // Ajout des superviseurs
            if (supervisors && supervisors.length > 0) {
                await SupervisorsPromotion.bulkCreate(
                    supervisors.map(supervisorId => ({
                        promotion_id: promotionId,
                        supervisor_id: supervisorId.id
                    }))
                );
            }
    
            await ModulePromotion.bulkCreate(
                modules.map(module => ({
                    promotion_id: promotionId,
                    trainer_id: module.trainerId || null, 
                    start_date: module.startDate || null,
                    end_date: module.endDate || null,
                    evaluation_id: module.evaluation_id || null,
                    module_id: module.id  
                }))
            );
            
    
            return promotion;
        } catch (error) {
            console.error("Erreur lors de l'ajout de la promotion :", error);
            throw error;
        }
    }

    async findPromotion(promotionId) {
        const studients = await StudientsPromotion.findAll({
            where: { promotion_id: promotionId },
            include: [
                {
                    model: User,
                    as: 'studientUser',
                    attributes: ['id', 'firstname', 'lastname', 'email', 'birthdate']
                }
            ]
        });
    
        const trainers = await TrainersPromotion.findAll({
            where: { promotion_id: promotionId },
            include: [
                {
                    model: User,
                    as: 'trainerUser',
                    attributes: ['id', 'firstname', 'lastname', 'email']
                }
            ]
        });
    
        const supervisors = await SupervisorsPromotion.findAll({
            where: { promotion_id: promotionId },
            include: [
                {
                    model: User,
                    as: 'supervisorUser',
                    attributes: ['id', 'firstname', 'lastname', 'email']
                }
            ]
        });
    
        return {
            studients: studients.map(s => s.studientUser),
            trainers: trainers.map(t => t.trainerUser),
            supervisors: supervisors.map(s => s.supervisorUser)
        };
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