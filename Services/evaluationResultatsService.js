import EvaluationResultat from '../models/evaluationResultat.js'

class EvaluationResultatsServices {

    // récuperer tout les resultat d'une évaluation
    async getAllEvaluationResultats() {
        return await EvaluationResultat.findAll();
    }
}

export default new EvaluationResultatsServices();