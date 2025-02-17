import { Model, DataTypes } from "sequelize";
import sequelize from '../config/Sequelize.js';
import Training from './training.js';

class Module extends Model {}

Module.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    title: {
        type: DataTypes.STRING(200),
        allowNull: false 
    },
    commentary: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    training_id: {
        type: DataTypes.INTEGER,
        allowNull: true, 
        references: {
            model: Training,
            key: "id"
        }
    }
}, {
    sequelize,
    modelName: "Module",
    tableName: "module",
    timestamps: false
});



export default Module;
