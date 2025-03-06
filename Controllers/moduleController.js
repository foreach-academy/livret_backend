import ModuleService from '../services/moduleServices.js';
import { CustomError } from '../errors/customError.js';

class ModuleController {
    async getAllModules(req, res, next) {
        try {
            const modules = await ModuleService.getAllModules();
            res.json(modules);
        } catch (error) {
            next(error)
        }
    }

    async getModuleById(req, res, next) {
        const { moduleId } = req.params;

        try {
            const module = await ModuleService.getModuleById(moduleId);
            if (!module) {
                throw new CustomError("Module non trouvé.", 404);
            }
            res.status(200).json(module);
        } catch (error) {
            next(error)
        }
    }

    async addModule(req, res, next) {
        const { title, commentary, training_id } = req.body;

        try {
            if (!title || !training_id) {
                throw new CustomError("Titre et formation obligatoires.", 400);
            }

            const newModule = await ModuleService.addModule(title, commentary, training_id);
            res.status(201).json(newModule);
        } catch (error) {
            next(error)
        }
    }

    async deleteModule(req, res, next) {
        const { moduleId } = req.params;
        try {
            const deleted = await ModuleService.deleteModule(moduleId);
            if (!deleted) {
                throw new CustomError("Module non trouvé.", 404);
            }
            res.status(200).json({ message: "Module supprimé avec succès." });
        } catch (error) {
            next(error)
        }
    }

    async updateModule(req, res, next) {
        const { moduleId } = req.params;
        const { title, commentary } = req.body;

        try {
            if (!title && !commentary) {
                throw new CustomError("Au moins un des champs est requis.", 400);
            }

            const updatedModule = await ModuleService.updateModule(moduleId, title, commentary);
            if (!updatedModule) {
                throw new CustomError("Module non trouvé.", 404);
            }
            res.status(200).json(updatedModule);
        } catch (error) {
            next(error)
        }
    }
}

export default new ModuleController();
