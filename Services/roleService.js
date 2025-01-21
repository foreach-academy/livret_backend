import Role from '../models/role.js';

class RoleServices {
    // Récupérer tous les rôles
    async getAllRoles() {
        return await Role.findAll();
    }
}

export default new RoleServices();
