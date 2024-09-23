// const jwt = require('jsonwebtoken');
// const config = require('../config/config.js');
// const User = require('../models/user.js');
// const Role = require('../models/role.js');
const jwt = require('jsonwebtoken'); // Assurez-vous d'avoir installé jsonwebtoken via npm
const config = require('../config/config');

// const authGuard = (req, res, next) => {
//     const authHeader = req.headers['authorization'];

//     if (!authHeader) {
//         return res.status(403).json({ error: 'No token provided' });
//     }

//     const token = authHeader.split(' ')[1];

//     if (!token) {
//         return res.status(403).json({ error: 'Invalid token format' });
//     }

//     jwt.verify(token, config.SECRET, (err, decoded) => {
//         if (err) {
//             return res.status(500).json({ error: 'Failed to authenticate token' });
//         }

//         req.userId = decoded.id;
//         next();
//     });
// };

    // verifier si j'ai le role admin pour faire une certaine action
    const authGuard = (req, res, next) => {

        // Récupérer le token depuis l'en-tête Authorization
        const authHeader = req.headers['authorization'];
        // Vérifier que l'en-tête Authorization est présent
        if (!authHeader) {
            return res.status(401).json({ message: 'Accès refusé. Aucun token fourni.' });
        }
        // Le token est souvent envoyé sous la forme "Bearer <token>", donc on le split
        const token = authHeader.split(' ')[1];
        // Vérifier que le token est présent
        if (!token) {
            return res.status(401).json({ message: 'Accès refusé. Le token est manquant.' });
        }
        // Vérifier et décoder le token
        try {
            const decoded = jwt.verify(token, config.SECRET); // Utiliser la clé secrète pour vérifier le token
            // Vérifier si l'utilisateur a un rôle d'admin
            if (decoded.role === 'Admin') {
                // Si l'utilisateur est admin alors je passe a la prochaine action
                return next();
            } else {
                // Si l'utilisateur n'est pas admin alors j'envoi un message d'erreur
                return res.status(403).json({ message: 'Accès refusé. Vous n\'avez pas les permissions nécessaires.' });
            }
            // autre erreur
        } catch (error) {
            console.log(error);
            return res.status(403).json({ message: 'Token invalide ou expiré.' });
        }
    };

module.exports = authGuard;