const db = require("../models");
const Product = db.products;
const Op = db.Sequelize.Op;
const utils = require('../utils');

exports.createProduct = async (req, res, next) => {
    data = req.body;
    const { code, name, description, price, quantity, category } = req.body;
    if (!code || !name || !description || !price || !quantity || !category) {
        return res.json({ message: 'Please enter all the details' })
    }
    var datum = await db.users.findByPk(utils.userID(req.headers.authorization))
        .then(data => {
            return data;
        });
    data.user_name = datum.name;
    Product.Product.create(data)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the Product."
            });
        });
}

exports.createProductAttribute = (req, res, next) => {
    const { code, name, } = req.body;
    if (!code || !name) {
        return res.json({ message: 'Please enter all the details' })
    }
    db.products.ProductAttribute.create(req.body)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Product Attribute."
            });
        });
}

exports.createProductAttributeValue = (req, res, next) => {
    const { code, value, productattributeId, productId } = req.body;
    if (!code || !value || !productattributeId || !productId) {
        return res.json({ message: 'Please enter all the details' })
    }
    Product.ProductAttributesValue.create(req.body)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the Product."
            });
        });
}

exports.showListProduct = async (req, res, next) => {
    const { limit, page } = req.query;
    Product.Product.findAndCountAll({
        include: [{
            model: Product.ProductAttributesValue,
            include: [{
                model: Product.ProductAttribute,
                as: 'attribute_name',
                attributes: ['name']
            }],
            as: 'attributes',
            attributes: ['id', 'value', 'price'],
        }, {
            model: db.categories
        }],
        limit: limit,
        offset: (page - 1) * limit,
        order: [['created_at', 'ASC']],
        attributes: {
            exclude: ['category_id']
        },
        distinct: true,
    })
        .then(data => {
            data.rows.map((data) => {
                data.dataValues.attributes.map((value) => {
                    value.dataValues.attribute_name = value.dataValues.attribute_name.name;
                })
            })
            const dt = data.rows;
            const total = data.count;
            const response = utils.pagination({ dt, total, limit, page });
            res.send(response);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving Products."
            });
        });
}

exports.searchProducts = async (req, res) => {
    const { id, name, price, user_name, limit, page } = req.query;
    const query = [];
    const limit1 = limit ? limit : 10;
    const page1 = page ? page : 1;
    if (id) query.push({ id: id });
    if (name) query.push({ name: { [Op.like]: `%${name}%` } });
    if (price) query.push({ '$attributes.price$': { [Op.lte]: price } });
    if (user_name) query.push({ user_name: { [Op.like]: `%${user_name}%` } });
    Product.Product.findAndCountAll({
        where: {
            [Op.and]: [
                ...query
            ]
        },
        include: [{
            model: Product.ProductAttributesValue,
            include: [{
                model: Product.ProductAttribute,
                as: 'attribute_name',
                attributes: ['name']
            }],
            as: 'attributes',
            attributes: ['id', 'value', 'price'],
        }, {
            model: db.categories
        }],
        limit: limit1,
        offset: (page1 - 1) * limit1,
        order: [['created_at', 'ASC']],
        attributes: {
            exclude: ['category_id']
        },
        distinct: true
    })
        .then(data => {
            data.rows.map((data) => {
                data.dataValues.attributes.map((value) => {
                    value.dataValues.attribute_name = value.dataValues.attribute_name.name;
                })
            })
            const dt = data.rows;
            const total = data.count;
            const response = utils.pagination({ dt, total, limit: 10, page: 1 });
            res.send(response);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving Products."
            });
        });
}

exports.editProduct = async (req, res) => {
    const id = req.params.id;
    Product.Product.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Product was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Product with id=${id}. Maybe Product was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Product with id=" + id
            });
        });
}