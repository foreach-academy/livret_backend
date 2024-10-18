const { model } = require('../config/Sequelize');
const User = require('../Models/user');
const Role = require('../models/role');
const bcrypt = require('bcrypt');
const xss = require('xss');
const validator = require('validator');

class UserServices {
    // Récupérer tous les utilisateurs
    async getAllUser() {
        return await User.findAll({
            include: [{
                model: Role,
                as: 'role'
            }]
        });
    }

    // Récupérer un utilisateur par ID
    async getUserById(id) {
        return await User.findByPk(id, {
            include: [{
                model: Role,
                as: 'role'
            }]
        });
    }

    // Ajouter un nouvel utilisateur
    async addUser(userData) {
        try {
            // Validation des données d'entrée
            if (!validator.isEmail(userData.email)) {
                throw new Error('Email invalide');
            }
            if (validator.isEmpty(userData.first_name)) {
                throw new Error('Le prénom ne peut pas être vide');
            }
            if (validator.isEmpty(userData.surname)) {
                throw new Error('Le nom ne peut pas être vide');
            }
            if (validator.isEmpty(userData.promo)) {
                throw new Error('La promo ne peut pas être vide');
            }
            if (validator.isEmpty(userData.company)) {
                throw new Error('L\'entreprise ne peut pas être vide');
            }

            // Nettoyer les données d'entrée pour éviter les attaques XSS
            userData.first_name = xss(userData.first_name);
            userData.surname = xss(userData.surname);
            userData.email = xss(userData.email);
            userData.promo = xss(userData.promo);
            userData.company = xss(userData.company);

            return await User.create(userData, {
                include: [{
                    model: Role,
                    as: 'role'
                }]
            });
        } catch (error) {
            console.error("Erreur lors de l'ajout de l'utilisateur:", error);
            throw error;
        }
    }

    // Mettre à jour un utilisateur
    async updateUser(ids, userData) {
        try {
            // Validation des données d'entrée
            if (userData.email && !validator.isEmail(userData.email)) {
                throw new Error('Email invalide');
            }

            // Nettoyer les données d'entrée pour éviter les attaques XSS
            if (userData.first_name) userData.first_name = xss(userData.first_name);
            if (userData.surname) userData.surname = xss(userData.surname);
            if (userData.email) userData.email = xss(userData.email);
            if (userData.promo) userData.promo = xss(userData.promo);
            if (userData.company) userData.company = xss(userData.company);

            // Trouver l'utilisateur par ID
            const user = await User.findByPk(ids);
            if (!user) {
                throw new Error('Utilisateur non trouvé');
            }

            // Si un mot de passe est fourni, le hacher
            if (userData.password) {
                userData.password = await bcrypt.hash(userData.password, 10);
            }

            // Mettre à jour l'utilisateur avec les nouveaux champs
            await user.update(userData);
            return user; // Renvoie l'utilisateur mis à jour
        } catch (error) {
            console.error('Erreur lors de la mise à jour de l\'utilisateur:', error);
            throw error; // Propager l'erreur
        }
    }

    // Supprimer un utilisateur
    async deleteUser(ids) {
        return await User.destroy({
            where: {
                id: ids
            }
        });
    }
}

module.exports = new UserServices();
