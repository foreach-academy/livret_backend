import roleService from '../services/roleServices.js';
import { CustomError } from '../errors/customError.js';

class RoleController {
    async getAllRoles(req, res, next) {
        try {
            const roles = await roleService.getAllRoles();
            res.json(roles);
        } catch (error) {
            next(new CustomError("Une erreur s'est produite lors de la récupération des rôles.", 500));
        }
    }
}

export default new RoleController();
