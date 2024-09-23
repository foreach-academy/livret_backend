
const User = require("../models/user");
const config = require('../config/config')
const jwt = require('jsonwebtoken')
const Role = require('../Models/role')



    const getUserByEmail = async (email) => {
        try {
            const normalizedEmail = email.trim().toLowerCase();
            const user = await User.findOne({
                where: { email: normalizedEmail },
                include: [{
                    model: Role,
                    as: 'role'
                }]
            });
            return user ? user.dataValues : null;
        } catch (error) {
            console.error("Erreur lors de la récupération de l'utilisateur par email:", error);
            throw new Error("Erreur lors de la récupération de l'utilisateur");
        }
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

