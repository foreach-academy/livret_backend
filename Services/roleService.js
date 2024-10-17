const Role = require('../models/role');
const xss = require('xss');
const validator = require('validator');

class RoleServices {
    // Récupérer tous les rôles
    async getAllRole() {
        return await Role.findAll();
    }

    // Récupérer un rôle par ID
    async getRoleById(roleId) {
        const role = await Role.findByPk(roleId);
        if (!role) {
            throw new Error('Rôle non trouvé');
        }
        return role;
    }

    // Ajouter un nouveau rôle
    async addRole(roleData) {
        try {
            // Validation des données d'entrée
            if (validator.isEmpty(roleData.name)) {
                throw new Error('Le nom du rôle ne peut pas être vide');
            }

            // Nettoyer les données d'entrée pour éviter les attaques XSS
            roleData.name = xss(roleData.name);

            return await Role.create(roleData);
        } catch (error) {
            console.error("Erreur lors de l'ajout du rôle:", error);
            throw error;
        }
    }

    // Mettre à jour un rôle
    async updateRole(roleId, roleData) {
        try {
            // Validation des données d'entrée
            if (roleData.name && validator.isEmpty(roleData.name)) {
                throw new Error('Le nom du rôle ne peut pas être vide');
            }

            // Nettoyer les données d'entrée pour éviter les attaques XSS
            if (roleData.name) {
                roleData.name = xss(roleData.name);
            }

            // Trouver le rôle par ID
            const role = await Role.findByPk(roleId);
            if (!role) {
                throw new Error('Rôle non trouvé');
            }

            // Mettre à jour le rôle avec les nouveaux champs
            await role.update(roleData);
            return role; // Renvoie le rôle mis à jour
        } catch (error) {
            console.error('Erreur lors de la mise à jour du rôle:', error);
            throw error; // Propager l'erreur
        }
    }

    // Supprimer un rôle
    async deleteRole(roleId) {
        const result = await Role.destroy({
            where: {
                id: roleId
            }
        });

        if (result === 0) {
            throw new Error('Rôle non trouvé ou déjà supprimé');
        }
    }
}

module.exports = new RoleServices();
