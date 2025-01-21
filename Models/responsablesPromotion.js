const { Model, DataTypes } = require("sequelize");
const sequelize = require('../config/Sequelize');

class ResponsablesPromotion extends Model {}

ResponsablesPromotion.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    responsable_id: {
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
    modelName: "ResponsablesPromotion",
    tableName: "responsables_promotion",
    timestamps: false
});

module.exports = ResponsablesPromotion;
