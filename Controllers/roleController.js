import roleService from '../services/roleServices.js';
import { CustomError } from '../errors/customError.js';

class RoleController {
    async getAllRoles(req, res, next) {
        try {
            const roles = await roleService.getAllRoles();
            res.json(roles);
        } catch (error) {
            next(error)
        }
    }
}

export default new RoleController();
