const Role = require('../Models/role');
const user = require('../Models/user');

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
};

module.exports = new UserService();