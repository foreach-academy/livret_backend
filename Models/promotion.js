import { Model, DataTypes } from "sequelize";
import sequelize from '../config/Sequelize.js';
import Training from './training.js';

class Promotion extends Model {}

Promotion.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    training_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: Training,
            key: "id"
        },
        onDelete: "SET NULL",
        onUpdate: "CASCADE"
    }
}, {
    sequelize,
    modelName: "Promotion",
    tableName: "promotion",
    timestamps: false
});


export default Promotion;
