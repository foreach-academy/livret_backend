import FormationModuleService from '../services/formationModuleService.js';
import xss from 'xss';

class FormationModuleController {
    // Récupérer tous les modules de formation
    async getAllFormationModule(req, res) {
        try {
            const formationModule = await FormationModuleService.getAllFormationModule();
            res.json(formationModule);
        } catch (error) {
            console.error('Erreur lors de la récupération de tous les modules de formation:', error);
            res.status(500).json({ error: 'Une erreur est survenue lors de la récupération de tous les modules de formation.' });
        }
    }

    // Récupérer un module de formation par son ID
    async getFormationModuleById(req, res) {
        try {
            const formationModule = await FormationModuleService.getFormationModuleById(req.params.id);
            if (!formationModule) {
                return res.status(404).json({ error: 'Module de formation non trouvé.' });
            }
            res.json(formationModule);
        } catch (error) {
            console.error(`Erreur lors de la récupération du module de formation avec ID ${req.params.id}:`, error);
            res.status(500).json({ error: 'Une erreur est survenue lors de la récupération du module de formation.' });
        }
    }

    // Ajouter un module de formation
    async addFormationModule(req, res) {
        try {
            // Validation et nettoyage des données d'entrée
            if (!req.body.formation_id || !req.body.module_id) {
                return res.status(400).json({ error: 'Les champs formation_id et module_id sont requis.' });
            }

            // Nettoyage des données pour éviter les attaques XSS
            const sanitizedData = {
                formation_id: xss(req.body.formation_id),
                module_id: xss(req.body.module_id)
            };

            const formationModule = await FormationModuleService.addFormationModule(sanitizedData);
            res.status(201).json(formationModule); // Retourner un statut 201 pour une création réussie
        } catch (error) {
            console.error('Erreur lors de l\'ajout d\'un module de formation:', error);
            res.status(500).json({ error: 'Une erreur est survenue lors de l\'ajout du module de formation.' });
        }
    }
}

export default new FormationModuleController();
