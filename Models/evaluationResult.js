import { Model, DataTypes } from "sequelize";
import sequelize from '../config/Sequelize.js';

class EvaluationResult extends Model {}

EvaluationResult.init({
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
    modelName: "EvaluationResult",
    tableName: "evaluation_result",
    timestamps: false
});

export default EvaluationResult;
