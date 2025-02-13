import roleService from '../services/roleServices.js';

class RoleController {
    async getAllRoles(req, res) {
        try {
            const roles = await roleService.getAllRoles();
            res.json(roles);
        } catch (error) {
            console.error('Erreur lors de la récupération des rôles:', error);
            res.status(500).json({ error: "Une erreur s'est produite lors de la récupération des rôles." });
        }
    }
}

export default new RoleController();
