const jwt = require('jsonwebtoken');
const config = require('../config/config');

const authGuard = (request, result, next) => {
    const authHeader = request.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return result.status(401).json({ error: "Token manquant" });
    }

    jwt.verify(token, config.SECRET, (error, user) => {
        if (error) {
            return result.status(401).json({ error: "Votre token n'est pas valide" });
        }
        request.user = user;

        if (user && user.role === 'Admin') {
            next();
        } else {
            return result.status(403).json({ error: "Vous n'avez pas les permissions nécessaires" });
        }
    });
};

module.exports = authGuard;
