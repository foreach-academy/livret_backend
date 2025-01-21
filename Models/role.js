import { Model, DataTypes } from "sequelize";
import sequelize from '../config/Sequelize.js';

class Role extends Model {}

Role.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    sequelize,
    modelName: "Role",
    tableName: "role",
    timestamps: false
});

export default Role;
