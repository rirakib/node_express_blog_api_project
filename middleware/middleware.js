const jwt = require('jsonwebtoken');

exports.isAuthenticate = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ error: 'No token provided, authorization denied' });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json({ error: 'Token is not valid' });
        }

      
        req.userId = decoded.id;
        req.userEmail = decoded.email;
        req.isAdmin = decoded.isAdmin; 
        req.user = decoded.user; 

        next();
    });
}

exports.isAdmin = (req, res, next) => {

    if (!req.userId) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    if (req.isAdmin) { 
        return next();
    } else {
        return res.status(403).json({ error: 'Access denied. Admins only.' });
    }
}
