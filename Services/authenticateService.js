
const User = require("../models/user.js");
const jwt = require('jsonwebtoken');
const config = require('../config/config.js');
const Role = require('../models/role')


    const getUserByEmail = async (email) => {
        try {
            const user = await User.findOne({
                where: { email: email },
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

    const createToken = (user) => {
        const userPayload = {
            id: user.id,
            email: user.email,
            user: `${user.first_name} ${user.surname}`,
            role: user.role.name
        };
        return jwt.sign(userPayload, config.SECRET, { expiresIn: '30d' });
    };



module.exports = {getUserByEmail, createToken};

