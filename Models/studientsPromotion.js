import { DataTypes, Model } from "sequelize";
import sequelize from '../config/Sequelize.js';
import User from "./user.js";
import Promotion from "./promotion.js";

class StudientsPromotion extends Model {}
StudientsPromotion.init({
    studient_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: {
            model: User,
            key: "id"
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE"
    },
    promotion_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: {
            model: Promotion,
            key: "id"
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE"
    }
}, {
    sequelize,
    modelName: "StudientsPromotion",
    tableName: "studients_promotion",
    timestamps: false
});


export default StudientsPromotion;
