import TrainingService from '../services/trainingService.js';
import xss from 'xss';

class TrainingController {
    async getAllTrainings(req, res) {
        try {
            const trainings = await TrainingService.getAllTrainings();
            res.json(trainings);
        } catch (error) {
            console.error('Erreur lors de la récupération de toutes les formations:', error);
            res.status(500).json({ error: 'Une erreur est survenue lors de la récupération des formations.' });
        }
    }

    async getTrainingById(req, res) {

        const {trainingId} = req.params

        try {
            const trainings = await TrainingService.getTrainingById(trainingId);
            res.json(trainings);
        } catch (error) {
            console.error('Erreur lors de la récupération de toutes les formations:', error);
            res.status(500).json({ error: 'Une erreur est survenue lors de la récupération des formations.' });
        }
    }

    async addTraining(req, res) {

        const {title, commentary} = req.body
        
        try {
            // Validation des données d'entrée
            if (!title) {
                throw new Error('Un nom de formation est requis');
            }

            const sanitizedData = {
                title: xss(title),
                commentary: xss(commentary)
            };

            const training = await TrainingService.addTraining(sanitizedData);
            res.status(201).json(training); // Retourner un statut 201 pour la création réussie
        } catch (error) {
            console.error('Erreur lors de l\'ajout d\'une formation:', error);
            res.status(500).json({ error: "Une erreur est survenue lors de l'ajout de la formation." });
            console.error('Error while getting students evaluations:', error); 
            res.status(500).json({ error: "An error occurred while getting formation", details: error.message }); 
        }
    }
}

export default new TrainingController();
