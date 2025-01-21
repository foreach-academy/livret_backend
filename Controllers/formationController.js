import FormationService from '../services/formationService.js';
import xss from 'xss';

class FormationController {
    async getAllFormations(req, res) {
        try {
            const formations = await FormationService.getAllFormations();
            res.json(formations);
        } catch (error) {
            console.error('Erreur lors de la récupération de toutes les formations:', error);
            res.status(500).json({ error: 'Une erreur est survenue lors de la récupération des formations.' });
        }
    }

    async getFormationById(req, res) {

        const {formationId} = req.params

        try {
            const formations = await FormationService.getFormationById(formationId);
            res.json(formations);
        } catch (error) {
            console.error('Erreur lors de la récupération de toutes les formations:', error);
            res.status(500).json({ error: 'Une erreur est survenue lors de la récupération des formations.' });
        }
    }

    async addFormation(req, res) {

        const {title, commentary} = req.body
        
        try {
            // Validation des données d'entrée
            if (!title) {
                throw new Error('Un nom de formation est requis');
            }

            const sanitizedData = {
                title: xss(title),
                commentary: xss(commentary)
            };

            const formation = await FormationService.addFormation(sanitizedData);
            res.status(201).json(formation); // Retourner un statut 201 pour la création réussie
        } catch (error) {
            console.error('Erreur lors de l\'ajout d\'une formation:', error);
            res.status(500).json({ error: "Une erreur est survenue lors de l'ajout de la formation." });
            console.error('Error while getting students evaluations:', error); 
            res.status(500).json({ error: "An error occurred while getting formation", details: error.message }); 
        }
    }
}

export default new FormationController();
