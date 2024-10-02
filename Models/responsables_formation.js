const { Model, DataTypes } = require("sequelize");
const sequelize = require('../config/Sequelize');

class ResponsablesFormation extends Model {}

ResponsablesFormation.init({
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
    formation_id: {
        type: DataTypes.INTEGER,
        references: {
            model: "Formation",
            key: "id"
        }
    }
}, {
    sequelize,
    modelName: "ResponsablesFormation",
    tableName: "responsables_formation",
    timestamps: false
});

module.exports = ResponsablesFormation;
