const db = require("./models");
const User = db.users;
const jwt = require('jsonwebtoken');

exports.userID = (token) => {
    const bearer = token.split(' ');
    const bearerToken = bearer[1];
    const verify = jwt.verify(bearerToken, process.env.SECRET_KEY);
    return verify.id;
}

