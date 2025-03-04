import ModuleService from '../services/moduleServices.js';
import { CustomError } from '../errors/customError.js';

class ModuleController {
    async getAllModules(req, res, next) {
        try {
            const modules = await ModuleService.getAllModules();
            res.json(modules);
        } catch (error) {
            next(new CustomError("Une erreur est survenue lors de la récupération de tous les modules.", 500));
        }
    }

    async getModuleById(req, res, next) {
        const { moduleId } = req.params;

        try {
            const module = await ModuleService.getModuleById(moduleId);
            if (!module) {
                return next(new CustomError("Module non trouvé.", 404));
            }
            res.status(200).json(module);
        } catch (error) {
            next(new CustomError("Une erreur est survenue lors de la récupération du module.", 500));
        }
    }

    async addModule(req, res, next) {
        const { title, commentary, training_id } = req.body;

        try {
            if (!title || !training_id) {
                return next(new CustomError("Titre et formation obligatoires.", 400));
            }

            const newModule = await ModuleService.addModule(title, commentary, training_id);
            res.status(201).json(newModule);
        } catch (error) {
            next(new CustomError("Une erreur est survenue lors de l'ajout du module.", 500));
        }
    }

    async deleteModule(req, res, next) {
        const { moduleId } = req.params;
        try {
            const deleted = await ModuleService.deleteModule(moduleId);
            if (!deleted) {
                return next(new CustomError("Module non trouvé.", 404));
            }
            res.status(200).json({ message: "Module supprimé avec succès." });
        } catch (error) {
            next(new CustomError("Une erreur est survenue lors de la suppression du module.", 500));
        }
    }

    async updateModule(req, res, next) {
        const { moduleId } = req.params;
        const { title, commentary } = req.body;

        try {
            if (!title && !commentary) {
                return next(new CustomError("Au moins un des champs est requis.", 400));
            }

            const updatedModule = await ModuleService.updateModule(moduleId, title, commentary);
            if (!updatedModule) {
                return next(new CustomError("Module non trouvé.", 404));
            }
            res.status(200).json(updatedModule);
        } catch (error) {
            next(new CustomError("Une erreur est survenue lors de la mise à jour du module.", 500));
        }
    }
}

export default new ModuleController();
