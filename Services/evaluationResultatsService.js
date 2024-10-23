const EvaluationResultat = require('../Models/evaluation_resultat')

class EvaluationResultatsServices {

    // récuperer tout les resultat d'une évaluation
    async getAllEvaluationResultats() {
        return await EvaluationResultat.findAll();
    }
}

module.exports = new EvaluationResultatsServices();