const { Model, DataTypes } = require("sequelize");
const sequelize = require('../config/Sequelize');

class SupervisorsPromotion extends Model {}

SupervisorsPromotion.init({
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
    modelName: "SupervisorsPromotion",
    tableName: "supervisors_promotion",
    timestamps: false
});

module.exports = SupervisorsPromotion;
