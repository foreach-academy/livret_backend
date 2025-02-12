import { Model, DataTypes } from "sequelize";
import sequelize from '../config/Sequelize.js';
import EvaluationResultat from './evaluationResult.js';

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
    studient_id: {
        type: DataTypes.INTEGER,
        references: {
            model: "User",
            key: "id"
        }
    },
    evaluation_resultat_id: {
        type: DataTypes.INTEGER,
        references: {
            model: EvaluationResultat,
            key: "id"
        }
    }, 
    comment: {
        type: DataTypes.STRING(1000),
        allowNull: true
    }
}, {
    sequelize,
    modelName: "Evaluation",
    tableName: "evaluation",
    timestamps: false
});

export default Evaluation;
