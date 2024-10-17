const ModuleService = require('../services/moduleService');
const xss = require('xss');

class ModuleControl {
    async getAllModule(req, res) {
        try {
            const modules = await ModuleService.getAllModule();
            res.json(modules);
        } catch (error) {
            console.error('Erreur lors de la récupération de tous les modules:', error);
            res.status(500).json({ error: "Une erreur est survenue lors de la récupération de tous les modules." });
        }
    }

    async getModuleById(req, res) {
        try {
            const moduleId = xss(req.params.id); // Nettoyage de l'ID du module
            const module = await ModuleService.getModuleById(moduleId);
            if (!module) {
                return res.status(404).json({ error: "Module non trouvé." });
            }
            res.json(module);
        } catch (error) {
            console.error('Erreur lors de la récupération du module:', error);
            res.status(500).json({ error: "Une erreur est survenue lors de la récupération du module." });
        }
    }

    async getModuleById(req, res){
        try{
            const module = await ModuleService.getModuleById(req.params.moduleId)
            res.json(module);
        }catch(error){
            res.status(500).json({error: " An error occured while getting module"});
        }
    }
    // async getModulesByFormateurId(req, res) {
    //     try {
    //         const formateurId = xss(req.params.formateurId); // Nettoyage de l'ID de l'enseignant
    //         const modules = await ModuleService.getModulesByFormateurId(formateurId);
    //         if (!modules) {
    //             return res.status(404).json({ error: "Aucun module trouvé pour cet enseignant." });
    //         }
    //         res.json(modules);
    //     } catch (error) {
    //         console.error('Erreur lors de la récupération des modules pour cet enseignant:', error);
    //         res.status(500).json({ error: "Une erreur est survenue lors de la récupération des modules pour cet enseignant." });
    //     }
    // }

    async addModule(req, res) {
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
                formateur_id: req.body.formateur_id ? xss(req.body.formateur_id) : null, // Optional field
                // Ajoutez d'autres champs nécessaires après nettoyage
            };

            const module = await ModuleService.addModule(sanitizedData);
            res.status(201).json(module); // Retourner un statut 201 pour la création réussie
        } catch (error) {
            console.error('Erreur lors de l\'ajout d\'un module:', error);
            res.status(500).json({ error: "Une erreur est survenue lors de l'ajout du module." });
        }
    }

};

module.exports = new ModuleControl();
