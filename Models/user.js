const { Model, DataTypes } = require("sequelize")
const sequelize = require('../config/Sequelize');
const bcrypt = require('bcrypt');
const Role =require("./role")

class User extends Model{
    async validateMdp(password){
        return await bcrypt.compare(password, this.password);
    }
}

User.init({
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },

    first_name:{
        type: DataTypes.STRING,
        allowNull: false
    },

    surname:{
        type: DataTypes.STRING,
        allowNull: false
    },

    email:{
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },

    password:{
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    },

    promo:{
        type: DataTypes.STRING,
        allowNull: false
    },

    role_id:{
        type: DataTypes.INTEGER,
        allowNull: false,
        references:{
            model: "Role",
            key: "id"
        }
    },

    company:{
        type: DataTypes.STRING,
        allowNull:false
    },
    // Ajout des champs pour la réinitialisation de mot de passe
    resetPasswordToken: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: true // Ce champ est null tant qu'il n'y a pas de demande de réinitialisation
    },

    resetPasswordExpires: {
        type: DataTypes.DATE,
        allowNull: true // Ce champ est null tant qu'il n'y a pas de demande de réinitialisation
    }
},{
    sequelize,
    modelName: "User",
    tableName: "user",
    timestamps: false,
    hooks:{
        beforeCreate: async(user) => {
            user.password = await bcrypt.hash(user.password, 10);
        },
    }
});

 User.belongsTo(Role, {as: "role",  foreignKey: "role_id" });
//  Role.hasMany(User,{as : "user", foreignKey: "id" });

module.exports = User;