const jwt = require('jsonwebtoken');

exports.isAuthenticate = (req, res, next) => {

    const authHeader = req.headers['authorization'];

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'No token provided, authorization denied' });
    }

    const token = authHeader.split(' ')[1];

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json({ error: 'Token is not valid or has expired' });
        }

        req.user = {
            id: decoded.id,
            email: decoded.email,
            isAdmin: decoded.isAdmin,
            ...decoded
        };

        next();
    });
}

exports.isAdmin = (req, res, next) => {

    if (!req.user) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    
    if (req.user.isAdmin) {
        return next();
    } else {
        return res.status(403).json({ error: 'Access denied. Admins only.' });
    }
}
