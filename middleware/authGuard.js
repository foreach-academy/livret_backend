import jwt from 'jsonwebtoken';

const authGuard = (request, response, next) => {
    const authHeader = request.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    // Vérification de la présence du token
    if (!token) {
        return response.status(401).json({ error: "Token manquant" });
    }

    // Vérification que le format du token est correct
    if (!/^[\w-]+\.[\w-]+\.[\w-]+$/.test(token)) {
        return response.status(401).json({ error: "Format de token invalide" });
    }

    // Vérification du token
    jwt.verify(token, process.env.PASSWORD_SECRET, (error, user) => {
        if (error) {
            return response.status(401).json({ error: "Token invalide" });
        }

        request.user = user;

        // Vérification du rôle de l'utilisateur
        if (user && user.role === 'Admin') {
            return next(); // Passe à la suite du traitement si l'utilisateur est admin
        } else {
            return response.status(403).json({ error: "Accès refusé" });
        }
    });
};

export default authGuard;
