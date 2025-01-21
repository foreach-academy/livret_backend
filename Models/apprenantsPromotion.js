import { DataTypes, Model } from "sequelize";
import sequelize from '../config/Sequelize';
import User from "./user";
import Promotion from "./Promotion";

class ApprenantsPromotion extends Model {}

ApprenantsPromotion.init({
    apprenant_id: {
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
    modelName: "ApprenantsPromotion",
    tableName: "apprenants_promotion",
    timestamps: false
});

export default ApprenantsPromotion;
