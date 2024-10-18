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
            console.error('Error while getting students evaluations:', error); 
            res.status(500).json({ error: "An error occurred while getting formation", details: error.message }); 
        }
    }

    async getStudentEvaluationsByModule(req, res) {
        try {
            const { studentId, moduleId } = req.params; 
            const evaluation = await FormationServ.getStudentEvaluationsByModule(studentId, moduleId);
            res.json(evaluation);
        } catch (error) {
            console.error('Error while getting students evaluations:', error); 
            res.status(500).json({ error: "An error occurred while getting this evaluation", details: error.message }); 
        }
    }


    async addFormation(req, res){
        try{
             const formation = await FormationServ.addFormation(req.body)
             res.json(formation)
        }catch(error){
            res.status(500).json({error: "An error occured while adding formation"})
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
