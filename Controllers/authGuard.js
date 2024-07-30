const jwt = require('jsonwebtoken');
const config = require('../config/config.json');

const authGuard = (req, res, next) => {
    const authHeader = req.headers['authorization'];

    if (!authHeader) {
        console.log("No token provided");
        return res.status(403).json({ error: 'No token provided' });
    }

    const token = authHeader.split(' ')[1];
    console.log("Token:", token);

    if (!token) {
        return res.status(403).json({ error: 'Invalid token format' });
    }

    jwt.verify(token, config.SECRET, (err, decoded) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to authenticate token' });
        }

        req.userId = decoded.id;
        next();
    });
};

module.exports = authGuard;

