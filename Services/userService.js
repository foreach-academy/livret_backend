const { model } = require('../config/Sequelize');
const Role = require('../models/role');
const user = require('../models/user');

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

    async addUser(userdata){
        return await user.create(userdata, {
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

    // Creation d'un utilisateur avec le role Admin à réactiver si besoin
    
    // async AddUserByAdmin(userdatas, currentUserRole) {
    //     // Vérification du rôle de l'utilisateur
    //     if (currentUserRole !== 'Admin') {
    //         throw new Error('Unauthorized'); // Lever une erreur si l'utilisateur n'est pas admin
    //     }
    
    //     // Création de l'utilisateur
    //     const newUser = await user.create(userdatas, {
    //         include: [{
    //             model: Role,
    //             as: 'role'
    //         }]
    //     });

    //     return newUser; // Retourner le nouvel utilisateur créé
    // }

};

module.exports = new UserService();