const db = require("../models");
const User = db.User;
const Op = db.Sequelize.Op;
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const utils = require('../utils');

exports.create = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res.json({ message: 'Please enter all the details' })
        }
        const userExist = await User.findOne({
            where: { email: email },
        });
        if (userExist) {
            return res.json({ message: 'User already exist with the given emailId' })
        }
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(req.body.password, salt);
        req.body.password = hashPassword;
        const user = await User.create(req.body);
        await user.save();
        const token = await jwt.sign({ id: user.id }, process.env.SECRET_KEY, {
            expiresIn: process.env.JWT_EXPIRE,
        });
        return res.json({ success: true, message: 'User registered successfully', data: user, token: token });
    } catch (error) {
        return res.json({ error: error });
    }
};

exports.findAll = (req, res) => {
    User.findAll({
        include: {
            model: db.Role,
        },
        attributes: {
            exclude: ['password', 'token', 'role_id']
        }
    })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving Users."
            });
        });
};

exports.findOne = (req, res) => {
    const id = parseInt(req.params.id);
    if (!req.headers.authorization) res.send(403);
    const check = utils.userID(req.headers.authorization);
    // if (id !== check) res.status(403).send("ID user not valid!!!");
    User.findByPk(check, {
        include: {
            model: db.Role,
        },
        attributes: {
            exclude: ['password', 'token', 'role_id']
        }
    })
        .then(data => {
            if (data) {
                res.send({ user: data });
            } else {
                res.status(404).send({
                    message: `Cannot find User with id=${id}.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving User with id=" + id
            });
        });
};


exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.json({ message: 'Please enter all the details' })
        }
        const userExist = await db.User.findOne({ where: { email: email }, attributes: ['id', 'name', 'email', 'password', 'role_id'] });
        if (!userExist) {
            return res.json({ message: 'Wrong credentials' })
        }
        const isMatch = await bcrypt.compare(password.toString(), userExist.password);
        if (!isMatch) {
            return res.json({ message: 'Wrong credentials pass' });
        }
        const token = jwt.sign({ id: userExist.id }, process.env.SECRET_KEY, {
            expiresIn: process.env.JWT_EXPIRE,
        });
        return res.json({ success: true, message: 'LoggedIn Successfully', token: token });
    } catch (error) {
        console.log(error);
        res.status(400).json({ error: error });
    }
}

exports.logout = (req, res) => {
    
}

exports.update = (req, res) => {
    const id = req.params.id;

    User.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "User was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update User with id=${id}. Maybe User was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating User with id=" + id
            });
        });
};

exports.delete = (req, res) => {
    const id = req.params.id;

    User.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "User was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete User with id=${id}. Maybe User was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete User with id=" + id
            });
        });
};
