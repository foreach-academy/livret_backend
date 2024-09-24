const { model } = require('../config/Sequelize');
const Role = require('../models/role');
const user = require('../models/user');
const bcrypt = require('bcrypt');

class UserService{
    async getAllUser(){
        return await user.findAll ({
            include:[{
                model: Role, 
                as: 'role'
            }] 
            });
    }

    async getUserById(utilisateurId){
        return await user.findByPk(utilisateurId, {
            include:[{
                model: Role, 
                as: 'role'
            }] 
            });
    }

    async getUsersByRole(roleName) {
        return await user.findAll({
            include: [{
                model: Role,
                as: 'role',
                where: { name: roleName }
            }]
        });
    }

    async addUser(userdata){
        return await user.create(userdata, {
            include:[{
                model: Role, 
                as: 'role'
            }] 
            });
    }
     
    async updateUser(ids, users) {
        try {
            // Trouver l'utilisateur par ID
            const User = await user.findByPk(ids);
            if (!User) {
                throw new Error('Utilisateur non trouvé');
            }
    
            // Si un mot de passe est fourni, le hacher
            if (users.password) {
                users.password = await bcrypt.hash(users.password, 10);
            }
    
            // Mettre à jour le rôle si un nouveau rôle est fourni
            if (users.role_id) { 
                const role = await Role.findByPk(users.role_id);
                if (!role) {
                    throw new Error('Rôle non trouvé');
                }
                // Mettre à jour le rôle de l'utilisateur
                await User.setRole(role); 
            }
    
            // Mettre à jour l'utilisateur avec les nouveaux champs
            await User.update(users);
            return User; // Renvoie l'utilisateur mis à jour
        } catch (error) {
            console.error('Erreur lors de la mise à jour de l\'utilisateur:', error);
            throw error; // Propager l'erreur
        }
    }
    
    

    async deleteUser(ids){
        return await user.destroy({
            where : {
                id: ids
            }
        })
    }
};

module.exports = new UserService();