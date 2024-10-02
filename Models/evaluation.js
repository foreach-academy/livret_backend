const { Model, DataTypes } = require("sequelize");
const sequelize = require('../config/Sequelize');
const EvaluationResultat = require('../Models/evaluation_resultat');
const EvaluationType = require('../Models/evaluation_type');

class Evaluation extends Model {}

Evaluation.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    created_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    },
    updated_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
        onUpdate: DataTypes.NOW
    },
    module_id: {
        type: DataTypes.INTEGER,
        references: {
            model: "Module",
            key: "id"
        }
    },
    apprenant_id: {
        type: DataTypes.INTEGER,
        references: {
            model: "User",
            key: "id"
        }
    },
    evaluation_type_id: {
        type: DataTypes.INTEGER,
        references: {
            model: EvaluationType,
            key: "id"
        }
    },
    evaluation_resultat_id: {
        type: DataTypes.INTEGER,
        references: {
            model: EvaluationResultat,
            key: "id"
        }
    }
}, {
    sequelize,
    modelName: "Evaluation",
    tableName: "evaluation",
    timestamps: false
});

module.exports = Evaluation;
