const jwt = require('jsonwebtoken');
const config = require('../config/config.js');
const User = require('../models/user.js');
const Role = require('../models/role.js');

const authGuard = (req, res, next) => {
    const authHeader = req.headers['authorization'];

    if (!authHeader) {
        return res.status(403).json({ error: 'No token provided' });
    }

    const token = authHeader.split(' ')[1];

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

const adminGuard = async (req, res, next) => {
    try {
        console.log(User);
        const user = await User.findOne({
            where: { id: req.userId },
            include: [{
                model: Role,
                as: 'role',
            }],
        });

        if (user && user.role.name === 'Admin') {
            return next();
        } else {
            console.log('acces denied')
            return res.status(401).json({ message: 'Unauthorized' });
        }
    } catch (error) {
        return res.status(500).json({ message: 'Server error' });
    }
};

const teacherGuard = async (req, res, next) => {
    try {
        const user = await User.findOne({
            where: { id: req.userId },
            include: [{
                model: Role,
                as: 'role',
            }],
        });

        if (!user) {
            return res.status(401).json({ error: 'Unauthorized' });
        }

        const userRole = user.role.name;
        if (userRole !== 'Formateur' && userRole !== 'Admin') {
            return res.status(401).json({ error: 'Unauthorized' });
        }

        next();
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};

module.exports = { authGuard, adminGuard, teacherGuard};

