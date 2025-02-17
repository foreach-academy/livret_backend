import { Model, DataTypes } from "sequelize";
import sequelize from '../config/Sequelize.js';


class Evaluation extends Model {}

Evaluation.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    comment: {
        type: DataTypes.STRING(1000),
        allowNull: false
    }
}, {
    sequelize,
    modelName: "Evaluation",
    tableName: "evaluation",
    timestamps: false
});

export default Evaluation;
