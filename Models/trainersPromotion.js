import { Model, DataTypes } from "sequelize";
import sequelize from '../config/Sequelize.js';
import User from "./user.js";
import Promotion from "./promotion.js";

class TrainersPromotion extends Model {}

TrainersPromotion.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    trainer_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: User,
            key: "id"
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE"
    },
    promotion_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Promotion,
            key: "id"
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE"
    }
}, {
    sequelize,
    modelName: "TrainersPromotion",
    tableName: "trainers_promotion",
    timestamps: false
});

export default TrainersPromotion;
