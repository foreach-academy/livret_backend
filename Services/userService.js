const user = require('../Models/user');

class UserService{
    async getAllUser(){
        return await user.findAll();
    }

    async getUserById(utilisateurId){
        return await user.findById(utilisateurId);
    }

    async addUser(userdata){
        return await user.create(userdata);
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
};

module.exports = new UserService();