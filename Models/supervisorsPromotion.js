import { Model, DataTypes } from "sequelize";
import sequelize from '../config/Sequelize.js';

class SupervisorsPromotion extends Model {}

SupervisorsPromotion.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    supervisor_id: {
        type: DataTypes.INTEGER,
        references: {
            model: "User",
            key: "id"
        }
    },
    promotion_id: {
        type: DataTypes.INTEGER,
        references: {
            model: "Promotion",
            key: "id"
        }
    }
}, {
    sequelize,
    modelName: "SupervisorsPromotion",
    tableName: "supervisors_promotion",
    timestamps: false
});

export default SupervisorsPromotion;
