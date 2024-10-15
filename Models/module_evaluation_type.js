const { Model, DataTypes } = require("sequelize");
const sequelize = require('../config/Sequelize');

class ModuleEvaluationType extends Model {}

ModuleEvaluationType.init({
    module_id: {
        type: DataTypes.INTEGER,
        references: {
            model: "Module",
            key: "id"
        }
    },
    evaluation_type_id: {
        type: DataTypes.INTEGER,
        references: {
            model: "EvaluationType",
            key: "id"
        }
    }
}, {
    sequelize,
    modelName: "ModuleEvaluationType",
    tableName: "module_evaluation_type",
    timestamps: false
});

module.exports = ModuleEvaluationType;
