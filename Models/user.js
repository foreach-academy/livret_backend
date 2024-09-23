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
        allowNull: false
    },

    password:{
        type: DataTypes.STRING,
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
        beforeUpdate : async (user) => {
            console.log(user.password);
            if (user.changed('password')) {
                user.password = await bcrypt.hash(user.password,10);
            }
        } 
    }
});

 User.belongsTo(Role, {as: "role",  foreignKey: "role_id" });
//  Role.hasMany(User,{as : "user", foreignKey: "id" });

module.exports = User;