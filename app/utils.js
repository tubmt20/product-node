const db = require("./models");
const User = db.users;
const jwt = require('jsonwebtoken');

exports.userID = (token) => {
    const bearer = token.split(' ');
    const bearerToken = bearer[1];
    const verify = jwt.verify(bearerToken, process.env.SECRET_KEY);
    return verify.id;
}

exports.pagination = data => {
    const total_page = Math.ceil(data.total / data.limit);
    const limit = parseInt(data.limit);
    const current_page = parseInt(data.page);
    const previous_page = current_page == 1 ? null : parseInt(current_page) - 1;
    const next_page = current_page == total_page ? null : parseInt(current_page) + 1;
    const result = {
        data: data.dt,
        pagination: {
            totalrecords: data.count,
            limit: limit,
            total_page,
            current_page,
            previous_page,
            next_page
        }
    };
    return result;
}

exports.loadData = (element, define, arr, fileHeader) => {
    try {
        let json = {};
        arr.map(text => json[define[fileHeader[text].v]] =
            element[fileHeader[text].v]
        );
        return json;
    } catch (err) {
        console.log(err);
        return "File template invalid!!!";
    }
}