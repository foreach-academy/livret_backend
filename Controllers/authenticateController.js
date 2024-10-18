const User = require('../Models/user.js');
const AuthenticateService = require('../Services/authenticateService.js');
const bcrypt = require('bcrypt');
const config = require('../config/config.js');
const xss = require('xss');

// Fonction d'enregistrement des utilisateurs
// const register = async (req, res) => {
//     try {
//         const { email, password, promo, role_id, company, prenom, surname } = req.body;

//         // Validation des données d'entrée
//         if (!email || !password || !promo || !role_id || !company || !prenom || !surname) {
//             return res.status(400).json({ error: "Tous les champs sont requis" });
//         }

//         // Nettoyage des données pour éviter les attaques XSS
//         const data = {
//             first_name: xss(prenom),
//             surname: xss(surname),
//             promo: xss(promo),
//             email: xss(email),
//             password: xss(password),
//             created_at: new Date(),
//             updated_at: new Date(),
//             company: xss(company),
//             role_id: xss(role_id) // Assurez-vous que role_id est un entier valide dans le modèle
//         };

//         // Créer l'utilisateur
//         const user = await User.create(data);
//         res.status(201).json({ message: "Inscription réussie", user });

//     } catch (error) {
//         console.error("Erreur lors de l'inscription:", error);
//         res.status(401).json({ error: "L'inscription a échoué" });
//     }
// };

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validation des données d'entrée
        if (!email || !password) {
            return res.status(400).json({ error: "L'authentification a échoué" });
        }

        // Nettoyage des données pour éviter les attaques XSS
        const sanitizedEmail = xss(email);
        const sanitizedPassword = xss(password); // Ajouter le nettoyage du mot de passe

        // Vérifier si l'utilisateur existe
        const user = await AuthenticateService.getUserByEmail(sanitizedEmail);
        console.log(user);
        if (!user) {
            console.log('Erreur : utilisateur non trouvé pour l\'email:', sanitizedEmail);
            return res.status(401).json({ error: "Email ou mot de passe invalide" });
        }

        // Vérification du mot de passe
        const checkPassword = await bcrypt.compare(sanitizedPassword, user.password); // Utiliser le mot de passe nettoyé
        console.log(checkPassword);

        if (!checkPassword) {
            return res.status(401).json({ message: "Email ou mot de passe invalide" });
        }

        // Génération du token
        const token = await AuthenticateService.createToken(user);
        return res.status(200).json({ message: "Connexion réussie", token });
    } catch (error) {
        console.error("Erreur lors de la connexion:", error);
        res.status(500).json({ error: "Erreur interne du serveur" });
    }
};

module.exports = {login };
