import { Model, DataTypes } from "sequelize";
import sequelize from '../config/Sequelize.js';

class Formation extends Model {}

Formation.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    title: {
        type: DataTypes.STRING(50),
        allowNull: false
    }
}, {
    sequelize,
    modelName: "Formation",
    tableName: "formation",
    timestamps: false
});

export default Formation;
