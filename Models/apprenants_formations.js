const { Model, DataTypes } = require("sequelize");
const sequelize = require('../config/Sequelize');

class ApprenantsFormation extends Model {}

ApprenantsFormation.init({
    apprenant_id: {
        type: DataTypes.INTEGER,
        references: {
            model: "User",
            key: "id"
        }
    },
    formation_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
    }
}, {
    sequelize,
    modelName: "ApprenantsFormation",
    tableName: "apprenants_formation",
    timestamps: false
});

module.exports = ApprenantsFormation;
