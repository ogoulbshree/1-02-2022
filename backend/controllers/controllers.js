let jwt = require('jsonwebtoken');

const verifyToken = async (req, res, next) => {
    let token = req.headers['authorization'] || req.headers['x-access-token'];
    if (token) {
        if (token.startsWith('Bearer ')) {
            // Remove Bearer from string
            token = token.slice(7, token.length);
        }
    }
    if (!token)
        return res.status(403).send({ auth: false, message: 'No token provided.' });

    jwt.verify(token, "superSec", function (err, decoded) {
        if (err)
            return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });

        // if everything good, save to request for use in other routes
        //req.email = decoded.email;
        next();
    });
}

module.exports = verifyToken;