import { Model, DataTypes } from "sequelize";
import sequelize from '../config/Sequelize.js';
import User from "./user.js";
import Training from "./training.js";
import Module from "./module.js";

class TrainingModule extends Model {}

TrainingModule.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    start_date: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    },
    end_date: {
        type: DataTypes.DATE,
        allowNull: false
    },
    trainer_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: User,
            key: "id"
        },
        onDelete: "SET NULL",
        onUpdate: "CASCADE"
    },
    training_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Training,
            key: "id"
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE"
    },
    module_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Module,
            key: "id"
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE"
    }
}, {
    sequelize,
    modelName: "TrainingModule",
    tableName: "training_module",
    timestamps: false
});


export default TrainingModule;
