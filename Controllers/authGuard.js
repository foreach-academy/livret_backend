// const jwt = require('jsonwebtoken');
// const config = require('../config/config.json');

// const authGuard = (req, res, next) => {
//     const token = req.headers['authorization'];

//     if (!token) {
//         return res.status(403).json({ error: 'No token provided' });
//     }

//     jwt.verify(token, config.SECRET, (err, decoded) => {
//         if (err) {
//             return res.status(500).json({ error: 'Failed to authenticate token' });
//         }

//         req.userId = decoded.id;
//         next();
//     });
// };

// module.exports = authGuard;

const jwt = require('jsonwebtoken');
const config = require('../config/config.json');

const authGuard = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    console.log("Authorization Header:", authHeader);

    if (!authHeader) {
        console.log("No token provided");
        return res.status(403).json({ error: 'No token provided' });
    }

    const token = authHeader.split(' ')[1];
    console.log("Token:", token);

    if (!token) {
        console.log("Invalid token format");
        return res.status(403).json({ error: 'Invalid token format' });
    }

    jwt.verify(token, config.SECRET, (err, decoded) => {
        if (err) {
            console.log("Failed to authenticate token:", err.message);
            return res.status(500).json({ error: 'Failed to authenticate token' });
        }

        req.userId = decoded.id;
        console.log("Token verified, userId:", req.userId);
        next();
    });
};

module.exports = authGuard;

