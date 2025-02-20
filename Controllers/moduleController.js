import ModuleService from '../services/moduleServices.js';

class ModuleControl {
    async getAllModules(req, res) {
        try {
            const modules = await ModuleService.getAllModules();
            res.json(modules);
        } catch (error) {
            console.error('Erreur lors de la récupération de tous les modules:', error);
            res.status(500).json({ error: "Une erreur est survenue lors de la récupération de tous les modules." });
        }
    }

    async getModuleById(req, res) {
        const { moduleId } = req.params;

        try {
            const module = await ModuleService.getModuleById(moduleId);
            res.status(200).json(module);
        } catch (error) {
            res.status(500).json({ error: "An error occurred while getting module" });
        }
    }

    async addModule(req, res) {
        const { title, commentary, training_id } = req.body;

        try {
            const newModule = await ModuleService.addModule(title, commentary, training_id);
            res.status(201).json(newModule);
        } catch (error) {
            res.status(500).json({ error: "An error occurred while adding module" });
        }
    }
    async deleteModule(req, res) {
        const { moduleId } = req.params;
        try {
            await ModuleService.deleteModule(moduleId);
            res.status(200).json({ message: "Module deleted successfully" });
        } catch (error) {
            res.status(500).json({ error: "An error occurred while deleting module" });
        }
    }

    async updateModule(req, res) {
        const { moduleId } = req.params;
        const { title, commentary } = req.body;

        try {
            const updatedModule = await ModuleService.updateModule(moduleId, title, commentary);
            res.status(200).json(updatedModule);
        } catch (error) {
            res.status(500).json({ error: "An error occurred while updating module" });
        }
    }
}

export default new ModuleControl();
