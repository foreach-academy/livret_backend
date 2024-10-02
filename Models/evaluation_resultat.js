const { Model, DataTypes } = require("sequelize");
const sequelize = require('../config/Sequelize');

class EvaluationResultat extends Model {}

EvaluationResultat.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING(50),
        allowNull: true
    }
}, {
    sequelize,
    modelName: "EvaluationResultat",
    tableName: "evaluation_resultat",
    timestamps: false
});

module.exports = EvaluationResultat;
