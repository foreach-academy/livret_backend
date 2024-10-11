const rateLimit = require('express-rate-limit');

// Middleware de rate limit pour la réinitialisation de mot de passe
const passwordResetLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // Fenêtre de 15 minutes
    max: 5, // Limite de 5 requêtes par IP toutes les 15 minutes
    handler: (req, res) => {
        const retryAfter = Math.ceil((req.rateLimit.resetTime - Date.now()) / 1000); // Calcul du temps restant en secondes
        console.log('Temps restant avant le prochain essai:', retryAfter); // Ajouté pour débogage
    
        // Ajouter l'en-tête Retry-After
        res.set('Retry-After', retryAfter.toString()); 
    
        // Message personnalisé avec le délai avant de pouvoir réessayer
        res.status(429).json({
            message: `Trop de tentatives de réinitialisation de mot de passe, veuillez réessayer dans ${retryAfter} secondes.`,
        });
}});

module.exports = {passwordResetLimiter};
