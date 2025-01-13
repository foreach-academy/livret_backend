import rateLimit from 'express-rate-limit';

// Fonction utilitaire pour formater le temps en minutes et secondes
const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes} minute(s) et ${remainingSeconds} seconde(s)`;
};

// Middleware de sécurité contre les attaques par force brute
const BruteForceSecurity = (options = {}) => {
    const windowMs = options.windowMs || 15 * 60 * 1000; // 15 minutes par défaut
    const max = options.max || 5; // Limite de tentatives par défaut

    return rateLimit({
        windowMs, 
        max,
        handler: (req, res) => {
            const retryAfterSeconds = Math.ceil((req.rateLimit.resetTime - Date.now()) / 1000); // Calcul du temps restant en secondes
            const retryAfterFormatted = formatTime(retryAfterSeconds); // Formater en minutes et secondes
            console.log('Temps restant avant le prochain essai:', retryAfterFormatted); // Debug

            // Ajouter l'en-tête Retry-After avec le temps en secondes pour le front-end
            res.set('Retry-After', retryAfterSeconds.toString());

            // Message personnalisé avec le délai formaté
            res.status(429).json({
                message: `Trop de tentatives, veuillez réessayer dans ${retryAfterFormatted}.`,
            });
        }
    });
};

export default BruteForceSecurity ;
