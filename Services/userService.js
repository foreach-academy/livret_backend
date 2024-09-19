const { model } = require('../config/Sequelize');
const Role = require('../Models/role');
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
     
    async updateUser(ids,users){
        return await user.update(users,{
            where : {
                id: ids
            }
        })
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