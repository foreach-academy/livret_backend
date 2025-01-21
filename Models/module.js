import { Model, DataTypes } from "sequelize";
import sequelize from '../config/Sequelize.js';

class Module extends Model {}

Module.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    title: {
        type: DataTypes.STRING(200),
        allowNull: true
    },
    commentary: {
        type: DataTypes.TEXT,
        allowNull: true
    }
}, {
    sequelize,
    modelName: "Module",
    tableName: "module",
    timestamps: false
});

export default Module;
