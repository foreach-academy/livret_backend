import { Model, DataTypes } from "sequelize";
import sequelize from '../config/Sequelize.js';
import Module from './module.js';
import EvaluationType from './evaluationType.js';

class ModuleEvaluationType extends Model {}

ModuleEvaluationType.init({
    module_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Module,
            key: "id"
        }
    },
    evaluation_type_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: EvaluationType,
            key: "id"
        }
    }
}, {
    sequelize,
    modelName: "ModuleEvaluationType",
    tableName: "module_evaluation_type",
    timestamps: false
});

export default ModuleEvaluationType;
