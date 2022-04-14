const jwt = require('jsonwebtoken');

module.exports.verifyJwtToken = (req, res, next) => {
    var token;
    if ('authorization' in req.headers)
        token = req.headers['authorization'].split(' ')[1];

    if (!token)
        return res.status(403).send({ auth: false, message: 'No token provided.' });
    else {
<<<<<<< HEAD
        jwt.verify(token, "SECRET#123",
=======
        jwt.verify(token, process.env.JWT_SECRET,
>>>>>>> fc88cec46f97d1863f4c718c87b713ceed9718ad
            (err, decoded) => {
                if (err)
                    return res.status(500).send({ auth: false, message: 'Token authentication failed.' });
                else {
                    req._id = decoded._id;
                    req.role = decoded.role;
<<<<<<< HEAD
=======
                    req.classname = decoded.classname;
>>>>>>> fc88cec46f97d1863f4c718c87b713ceed9718ad
                    req.pic = decoded.pic;
                    req.loginPermission = decoded.loginPermission;
                    next();
                }
            }
        )
    }
}