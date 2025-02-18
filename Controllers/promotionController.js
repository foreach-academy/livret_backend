import promotionService from '../services/promotionService.js';

class promotionController {
    async getAllPromotions(req, res) {
        try {
            const promotions = await promotionService.getAllPromotions();
            res.json(promotions);
        } catch (error) {
            console.error('Erreur lors de la récupération de toutes les promotions:', error);
            res.status(500).json({ error: 'Une erreur est survenue lors de la récupération des promotions.' });
        }
    }

    async getPromotionById(req, res) {
        const { promotionId } = req.params;
        try {
            const promotion = await promotionService.getPromotionById(promotionId);
            if (!promotion) {
                return res.status(404).json({ error: 'Promotion non trouvée' });
            }
            res.json(promotion);
        } catch (error) {
            console.error('Erreur lors de la récupération de la promotion:', error);
            res.status(500).json({ error: 'Une erreur est survenue lors de la récupération de la promotion.' });
        }
    }

    async addPromotion(req, res) {
        console.log("Données reçues:", req.body); // 👀 Vérifier ce qui est envoyé
    
        const { title, training_id, students, trainers, supervisors } = req.body;
        try {
            if (!title || !training_id) {
                return res.status(400).json({ error: 'Titre et formation obligatoires' });
            }
    
            const promotionData = { title, training_id };
    
            const newPromotion = await promotionService.addPromotion(promotionData, students, trainers, supervisors);
            res.status(201).json(newPromotion);
        } catch (error) {
            console.error("Erreur lors de l'ajout de la promotion:", error);
            res.status(500).json({ error: "Une erreur est survenue lors de l'ajout de la promotion." });
        }
    }
    
    

    async updatePromotion(req, res) {
        const { promotionId } = req.params;
        const { title, training_id } = req.body;
        try {
            // Validation des données d'entrée
            if (!title && !training_id) {
                return res.status(400).json({ error: 'Titre et formation obligatoires' });
            }

            const promotionData = { title, training_id };

            await promotionService.updatePromotion(promotionId, promotionData);
            res.status(200).json({ message: 'Promotion mise à jour' });
        }
        catch (error) {
            console.error('Erreur lors de la mise à jour de la promotion:', error);
            res.status(500).json({ error: 'Une erreur est survenue lors de la mise à jour de la promotion.' });
        }
    }

    async deletePromotion(req, res) {
        const { promotionId } = req.params;
        try{
            await promotionService.deletePromotion(promotionId);
            res.status(200).json({ message: 'Promotion supprimée' });
        }
        catch(error){
            console.error('Erreur lors de la suppression de la promotion:', error);
            res.status(500).json({ error: 'Une erreur est survenue lors de la suppression de la promotion.' });
        }
    }
};

export default new promotionController();
