const EvaluationResultat = require('../Models/evaluation_resultat')

class EvaluationResultatsServices {
    async getAllEvaluationResultats() {
        return await EvaluationResultat.findAll();
    }
}

module.exports = new EvaluationResultatsServices();