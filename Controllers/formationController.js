const FormationServ = require('../services/formationService');
const xss = require('xss');

class FormationControl {
    async getAllFormation(req, res) {
        try {
            const formations = await FormationServ.getAllFormation();
            res.json(formations);
        } catch (error) {
            console.error('Erreur lors de la récupération de toutes les formations:', error);
            res.status(500).json({ error: 'Une erreur est survenue lors de la récupération des formations.' });
        }
    }

    async getStudentsEvaluationsByFormationAndModule(req, res) {
        try {
            const { formationId, moduleId } = req.params; 
            // Nettoyage des données pour éviter les attaques XSS
            const sanitizedFormationId = xss(formationId);
            const sanitizedModuleId = xss(moduleId);

            const students = await FormationServ.getStudentsEvaluationsByFormationAndModule(sanitizedFormationId, sanitizedModuleId);
            res.json(students);
        } catch (error) {
            console.error('Erreur lors de la récupération des évaluations des étudiants:', error);
            res.status(500).json({ error: "Une erreur est survenue lors de la récupération de la formation.", details: error.message });
        }
    }

    async addFormation(req, res) {
        try {
            // Validation des données d'entrée
            if (!req.body.title || !req.body.start_date || !req.body.end_date) {
                return res.status(400).json({ error: 'Les champs title, start_date et end_date sont requis.' });
            }

            // Nettoyage des données pour éviter les attaques XSS
            const sanitizedData = {
                title: xss(req.body.title),
                start_date: xss(req.body.start_date),
                end_date: xss(req.body.end_date),
                commentary: req.body.commentary ? xss(req.body.commentary) : null, // Optional field
            };

            const formation = await FormationServ.addFormation(sanitizedData);
            res.status(201).json(formation); // Retourner un statut 201 pour la création réussie
        } catch (error) {
            console.error('Erreur lors de l\'ajout d\'une formation:', error);
            res.status(500).json({ error: "Une erreur est survenue lors de l'ajout de la formation." });
        }
    }

    async getModulesByFormationId(req, res) {
        try {
            const sanitizedFormationId = xss(req.params.formationId); // Nettoyage de l'ID de formation
            const modules = await FormationServ.getModulesByFormationId(sanitizedFormationId);
            if (!modules) {
                return res.status(404).json({ error: 'Modules non trouvés pour cette formation.' });
            }
            res.json(modules);
        } catch (error) {
            console.error(`Erreur lors de la récupération des modules pour la formation ID ${req.params.formationId}:`, error);
            res.status(500).json({ error: "Une erreur est survenue lors de la récupération des modules pour cette formation." });
        }
    }

    async getModulesByFormationIdAndFormateurId(req, res) {
        try {
            const sanitizedFormationId = xss(req.params.formationId); // Nettoyage de l'ID de formation
            const sanitizedFormateurId = xss(req.params.formateurId); // Nettoyage de l'ID de formateur

            const modules = await FormationServ.getModulesByFormationIdAndFormateurId(sanitizedFormationId, sanitizedFormateurId);
            if (!modules) {
                return res.status(404).json({ error: 'Modules non trouvés pour cette formation et cet enseignant.' });
            }
            res.json(modules);
        } catch (error) {
            console.error(`Erreur lors de la récupération des modules pour la formation ID ${req.params.formationId} et l'enseignant ID ${req.params.formateurId}:`, error);
            res.status(500).json({ error: "Une erreur est survenue lors de la récupération des modules pour cette formation et cet enseignant." });
        }
    }
}

module.exports = new FormationControl();
