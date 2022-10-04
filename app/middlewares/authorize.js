const db = require("../models");
const User = db.users;
const jwt = require('jsonwebtoken');

module.exports = authorize;
function authorize(roles = []) {
    if (typeof roles === 'string') {
        roles = [roles];
    }
    return [

        (req, res, next) => {
            const bearerHeader = req.headers['authorization'];
            if (!bearerHeader) {
                return next('Please login to access the data');
            }
            const bearer = bearerHeader.split(' ');
            const bearerToken = bearer[1];
            const verify = jwt.verify(bearerToken, process.env.SECRET_KEY);
            User.findByPk(verify.id)
                .then(user => {
                    if (!user) {
                        return next('User not found');
                    }
                    if (roles.length && !roles.includes(user.role)) {
                        return next('Unauthorized');
                    }
                });
            next();
        }
    ];
}