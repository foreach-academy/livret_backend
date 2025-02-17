import User from '../models/user.js';
import Role from '../models/role.js';
import bcrypt from 'bcrypt';
import EmailServices from './emailServices.js';

class UserServices {
    // Récupérer tous les utilisateurs
    async getAllUsers() {
        return await User.findAll({
            include: [{
                model: Role,
                as: 'userRole'
            }],
            attributes: { exclude: ['password'] }
        });
    }

    // Récupérer tous les utilisateurs d'un rôle spécifique
    async getUserByRole(role) {
        return await User.findAll({
            where: { role_id: role },
            include: [{
                model: Role,
                as: 'roleUser'
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
            // Création de l'utilisateur
            const newUser = await User.create(userData, {
                include: [{
                    model: Role,
                    as: 'role'
                }]
            });
    
            // Envoi de l'email de bienvenue
            if (newUser) {
                try {
                    await EmailServices.sendWelcomeEmail(newUser);
                } catch (emailError) {
                    console.error('Erreur lors de l\'envoi de l\'email:', emailError);
                }
            }
    
            return newUser;
        } catch (error) {
            console.error("Erreur lors de l'ajout de l'utilisateur:", error);
            throw error;
        }
    }
    

    // Mettre à jour un utilisateur
    async updateUser(id, userData) {
        try {
            const user = await User.findByPk(id);
            if (!user) {
                throw new Error('Utilisateur non trouvé');
            }

            if (userData.password) {
                userData.password = await bcrypt.hash(userData.password, 10);
            }

            await user.update(userData);
            return user;
        } catch (error) {
            console.error('Erreur lors de la mise à jour de l\'utilisateur:', error);
            throw error;
        }
    }

    // Supprimer un utilisateur
    async deleteUser(id) {
        return await User.destroy({
            where: {
                id: id
            }
        });
    }
}

export default new UserServices();
