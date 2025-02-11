import { DataTypes, Model } from "sequelize";
import sequelize from '../config/Sequelize';
import User from "./user";
import Promotion from "./Promotion";

class StudientsPromotion extends Model {}

StudientsPromotion.init({
    studient_id: {
        type: DataTypes.INTEGER,
        references: {
            model: User,
            key: "id"
        }
    },
    promotion_id: {
        type: DataTypes.INTEGER,
        references: {
            model: Promotion,
            key: "id"
        }
    }
}, {
    sequelize,
    modelName: "StudientsPromotion",
    tableName: "studients_promotion",
    timestamps: false
});

export default StudientsPromotion;
