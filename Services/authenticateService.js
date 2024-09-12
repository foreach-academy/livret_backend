
const User = require("../Models/user");
const config = require('../config/config')
const jwt = require('jsonwebtoken')
const Role = require('../Models/role')



   const getUserByEmail = async (email) =>{
    const user =  await User.findOne({where:{ email }, include: [{
        model: Role,
        as: 'role'
    }]});
       return user? user.dataValues : null;
   }
   
    const createToken = async (user) => {

        const token = jwt.sign({ 
            id: user.id, 
            email: user.email, 
            role: user.role.name}, 
            config.SECRET, {
            expiresIn: '30d'
        });
        return token;
   }


module.exports = {getUserByEmail, createToken};

