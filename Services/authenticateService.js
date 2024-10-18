const User = require("../Models/user.js");
const jwt = require('jsonwebtoken');
const config = require('../config/config.js');
const Role = require('../Models/role');
const xss = require('xss'); // Importer la bibliothèque xss

const getUserByEmail = async (email) => {
    try {
        const user = await User.findOne({
            where: { email: email },
            include: [{
                model: Role,
                as: 'role'
            }]
        });
        // Retourner null si l'utilisateur n'existe pas
        return user ? user.dataValues : null;
    } catch (error) {
        console.error("Erreur lors de la récupération de l'utilisateur par email:", error);
        throw new Error("Erreur lors de la récupération de l'utilisateur");
    }
};

const createToken = (user) => {
    const userPayload = {
        id: user.id,
        email: user.email,
        user: `${xss(user.first_name)} ${xss(user.surname)}`, // Nettoyer les noms
        role: xss(user.role.name) // Nettoyer le nom du rôle
    };
    return jwt.sign(userPayload, config.SECRET, { expiresIn: '30d' });
};

module.exports = { getUserByEmail, createToken };
