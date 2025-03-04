import { Model, DataTypes } from "sequelize";
import sequelize from '../config/Sequelize.js';

class Training extends Model {}

Training.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false
    }
}, {
    sequelize,
    modelName: "Training",
    tableName: "training",
    timestamps: false
});



export default Training;
