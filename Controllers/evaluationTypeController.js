import EvaluationTypeService from '../services/evaluationTypeService.js';

class EvaluationTypeController{
    async getAllEvaluationType(req, res){
        try{
            const evaluationType = await EvaluationTypeService.getAllEvaluationType()
            res.json(evaluationType)
        }catch(error){
            res.status(500).json({error: 'An error occured while getting all evaluation types'});
        }
    }

    async getEvaluationTypeById(req, res){
        try{
            const evaluationType = await EvaluationTypeService.getEvaluationTypeById(req.params.id)
            res.json(evaluationType)
        }catch(error){
            res.status(500).json({error: 'An error occured while getting evaluation type'});
        }
    }

    async addEvaluationType(req, res){
        try{
            const evaluationType = await EvaluationTypeService.addEvaluationType(req.body)
            res.json(evaluationType)
        }catch(error){
            res.status(500).json({error: 'An error occured while adding evaluation type'})
        }
    }

    async addEvaluationTypeToModule(req, res){
        try {
            const evaluationType = await EvaluationTypeService.addEvaluationTypeToModule(req.body);
            res.json(evaluationType);
        } catch (error) {
            res.status(500).json({error: 'An error occured while adding this evaluation type to this module'})
        }
    }

    async getEvaluationTypeByModuleId(req, res){
        try {
            const evaluationTypes = await EvaluationTypeService.getEvaluationTypeByModuleId(req.params.moduleId);
            res.json(evaluationTypes);
        } catch (error) {
            res.status(500).json({error: 'An error occured while adding getting this evaluation type for this'})
        }
    }

    async removeEvaluationTypeFromModule(req, res) {
        try {
            const { module_id, evaluation_type_id } = req.body;
            const result = await EvaluationTypeService.removeEvaluationTypeFromModule(module_id, evaluation_type_id);
            if (result) {
                res.json({ message: 'Type d’évaluation retiré avec succès.' });
            } else {
                res.status(404).json({ error: 'Type d’évaluation ou module non trouvé.' });
            }
        } catch (error) {
            res.status(500).json({ error: 'Erreur lors de la suppression du type d’évaluation.' });
        }
    }
};

export default new EvaluationTypeController();