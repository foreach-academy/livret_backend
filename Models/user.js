import sequelize from '../config/Sequelize.js';
import Role from "./role.js";
import { Model, DataTypes } from "sequelize";

class User extends Model {}

User.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    lastname: {
        type: DataTypes.STRING,
        allowNull: false
    },
    firstname: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    birthdate: {
        type: DataTypes.DATE,
        allowNull: true
    },
    promo: {
        type: DataTypes.STRING,
        allowNull: true
    }
    ,
    created_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
        field: 'created_at'
    },
    updated_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
        field: 'updated_at'
    },    
    position:{
        type: DataTypes.STRING,
        allowNull: true,
    },
    role_id: {
        type: DataTypes.INTEGER,
        references: {
            model: Role,
            key: "id"
         }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    reset_password_token: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: true 
    },
    reset_password_expires: {
        type: DataTypes.DATE,
        allowNull: true
    },
    photo: {
        type: DataTypes.STRING,
        allowNull: true,
    }
}, {
    sequelize,
    modelName: "User",
    tableName: "user",
    timestamps: false,

});

User.belongsTo(Role, {foreignKey: 'role_id', as: 'role'})

export default User;
