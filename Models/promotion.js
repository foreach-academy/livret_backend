import { Model, DataTypes } from "sequelize";
import sequelize from '../config/Sequelize.js';
import Formation from "./formation.js";

class Promotion extends Model { }

Promotion.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    formation_id: {
        type: DataTypes.STRING,
        references: {
            model: Formation,
            key: "id"
        },
    }
}, {
    sequelize,
    modelName: "Promotion",
    tableName: "promotion",
    timestamps: false
});

export default Promotion;
