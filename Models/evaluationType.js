import { Model, DataTypes } from "sequelize";
import sequelize from '../config/Sequelize.js';
import Evaluation from './evaluation.js';
import EvaluationTypeList from './evaluationTypeList.js';

class EvaluationType extends Model {}

EvaluationType.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    evaluation_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Evaluation,
            key: "id"
        }
    },
    type_eval: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: EvaluationTypeList,
            key: "id"
        }
    }
}, {
    sequelize,
    modelName: "EvaluationType",
    tableName: "evaluation_type",
    timestamps: false
});

export default EvaluationType;
