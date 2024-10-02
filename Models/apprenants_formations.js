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
        references: {
            model: "Formation",
            key: "id"
        }
    }
}, {
    sequelize,
    modelName: "ApprenantsFormation",
    tableName: "apprenants_formation",
    timestamps: false
});

module.exports = ApprenantsFormation;
