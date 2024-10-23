const roleService = require('../Services/roleService');
const xss = require('xss'); // Assurez-vous d'installer cette bibliothèque avec npm

class RoleController {
    async getAllRole(req, res) {
        try {
            const roles = await roleService.getAllRole();
            res.json(roles);
        } catch (error) {
            console.error('Erreur lors de la récupération des rôles:', error);
            res.status(500).json({ error: "Une erreur s'est produite lors de la récupération des rôles." });
        }
    }

    async getRoleById(req, res) {
        try {
            const roleId = xss(req.params.id); // Nettoyage de l'ID du rôle
            const role = await roleService.getRoleById(roleId);
            if (!role) {
                return res.status(404).json({ error: "Rôle non trouvé." });
            }
            res.json(role);
        } catch (error) {
            console.error('Erreur lors de la récupération du rôle:', error);
            res.status(500).json({ error: "Une erreur s'est produite lors de la récupération du rôle." });
        }
    }

    async addRole(req, res) {
        try {
            // Validation des données d'entrée
            if (!req.body.name) {
                return res.status(400).json({ error: "Le champ 'name' est requis." });
            }

            // Nettoyage des données pour éviter les attaques XSS
            const sanitizedData = {
                name: xss(req.body.name)
            };

            const role = await roleService.addRole(sanitizedData);
            res.status(201).json(role); // Retourner un statut 201 pour la création réussie
        } catch (error) {
            console.error('Erreur lors de l\'ajout d\'un rôle:', error);
            res.status(500).json({ error: "Une erreur s'est produite lors de l'ajout du rôle." });
        }
    }

    async updateRole(req, res) {
        try {
            // Validation des données d'entrée
            if (!req.body.name) {
                return res.status(400).json({ error: "Le champ 'name' est requis pour la mise à jour." });
            }

            // Nettoyage des données pour éviter les attaques XSS
            const sanitizedData = {
                name: xss(req.body.name)
            };

            const role = await roleService.updateRole(req.params.id, sanitizedData);
            if (!role) {
                return res.status(404).json({ error: "Rôle non trouvé pour la mise à jour." });
            }
            res.json(role);
        } catch (error) {
            console.error('Erreur lors de la mise à jour du rôle:', error);
            res.status(500).json({ error: "Une erreur s'est produite lors de la mise à jour du rôle." });
        }
    }

    async deleteRole(req, res) {
        try {
            const roleId = xss(req.params.id); // Nettoyage de l'ID du rôle
            const role = await roleService.deleteRole(roleId);
            if (!role) {
                return res.status(404).json({ error: "Rôle non trouvé pour la suppression." });
            }
            res.json({ message: "Rôle supprimé avec succès." });
        } catch (error) {
            console.error('Erreur lors de la suppression du rôle:', error);
            res.status(500).json({ error: "Une erreur s'est produite lors de la suppression du rôle." });
        }
    }
}

module.exports = new RoleController();
