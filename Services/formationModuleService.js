import FormationModule from '../models/formationModule.js';
import xss from 'xss';

class FormationModuleService {
    // Récupérer tous les modules de formation
    async getAllFormationModule() {
        return await FormationModule.findAll();
    }

    // Récupérer un module de formation par ID
    async getFormationModuleById(formationModuleId) {
        const formationModule = await FormationModule.findByPk(formationModuleId);
        if (!formationModule) {
            throw new Error('Module de formation non trouvé');
        }
        return formationModule;
    }

    // Ajouter un nouveau module de formation
    async addFormationModule(formationModuleData) {
        try {
            // Validation des données d'entrée pour éviter les attaques XSS
            if (!formationModuleData.formation_id || !formationModuleData.module_id) {
                throw new Error('Les champs formation_id et module_id sont requis');
            }

            // Nettoyer les données d'entrée pour éviter les attaques XSS
            formationModuleData.formation_id = xss(formationModuleData.formation_id);
            formationModuleData.module_id = xss(formationModuleData.module_id);

            return await FormationModule.create(formationModuleData);
        } catch (error) {
            console.error("Erreur lors de l'ajout du module de formation:", error);
            throw error;
        }
    }

    // Mettre à jour un module de formation
    async updateFormationModule(formationModuleId, formationModuleData) {
        try {
            // Validation des données d'entrée pour éviter les attaques XSS
            if (!formationModuleData.formation_id && !formationModuleData.module_id) {
                throw new Error('Au moins un champ doit être fourni pour la mise à jour');
            }

            // Nettoyer les données d'entrée pour éviter les attaques XSS
            if (formationModuleData.formation_id) {
                formationModuleData.formation_id = xss(formationModuleData.formation_id);
            }
            if (formationModuleData.module_id) {
                formationModuleData.module_id = xss(formationModuleData.module_id);
            }

            // Trouver le module de formation par ID
            const formationModule = await FormationModule.findByPk(formationModuleId);
            if (!formationModule) {
                throw new Error('Module de formation non trouvé');
            }

            // Mettre à jour le module de formation avec les nouveaux champs
            await formationModule.update(formationModuleData);
            return formationModule; // Renvoie le module de formation mis à jour
        } catch (error) {
            console.error('Erreur lors de la mise à jour du module de formation:', error);
            throw error; // Propager l'erreur
        }
    }

    // Supprimer un module de formation
    async deleteFormationModule(formationModuleId) {
        const result = await FormationModule.destroy({
            where: {
                formation_id: formationModuleId // Suppression basée sur l'ID
            }
        });

        if (result === 0) {
            throw new Error('Module de formation non trouvé ou déjà supprimé');
        }
    }
}

export default new FormationModuleService();
