import { Model, DataTypes } from "sequelize";
import sequelize from '../config/Sequelize.js';

class EvaluationTypeList extends Model {}

EvaluationTypeList.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    sequelize,
    modelName: "EvaluationTypeList",
    tableName: "evaluation_type_list",
    timestamps: false
});

export default EvaluationTypeList;
