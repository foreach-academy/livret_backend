import { Model, DataTypes } from "sequelize";
import sequelize from '../config/Sequelize.js';

class EvaluationType extends Model {}

EvaluationType.init({
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
    modelName: "EvaluationType",
    tableName: "evaluation_type",
    timestamps: false
});

export default EvaluationType;
