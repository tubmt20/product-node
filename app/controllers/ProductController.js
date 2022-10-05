const db = require("../models");
const Product = db.products;
const Op = db.Sequelize.Op;
const ulities = require('../Ulities');

exports.createProduct = async (req, res, next) => {
    data = req.body;
    const { code, name, description, price, quantity, category } = req.body;
    if (!code || !name || !description || !price || !quantity || !category) {
        return res.json({ message: 'Please enter all the details' })
    }
    var datum = await db.users.findByPk(ulities.userID(req.headers.authorization))
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
                message:
                    err.message || "Some error occurred while creating the Product."
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
                message:
                    err.message || "Some error occurred while creating the Product."
            });
        });
}

exports.showListProduct = async (req, res, next) => {
    Product.Product.findAll({
        include: [
            {
                model: Product.ProductAttributesValue,
                include: [
                    {
                        model: Product.ProductAttribute,
                        as: 'attribute_name',
                        attributes: ['name']
                    }
                ],
                as: 'attributes',
                attributes: ['id', 'value', 'price'],
            }
        ],
    })
        .then(data => {
            data.map((data) => {
                data.dataValues.attributes.map((value) => {
                    value.dataValues.attribute_name = value.dataValues.attribute_name.name;
                })
            })
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving Products."
            });
        });
}

exports.searchProducts = async (req, res) => {
    const { name, price, user_name } = req.query;
    Product.Product.findAll({
        where: {
            [Op.and]: [{ name: { [Op.like]: `%${name}%` } }, { user_name: { [Op.like]: `%${user_name}%` } },
            { '$attributes.price$': { [Op.lte]: price } }]
        },
        include: [
            {
                model: Product.ProductAttributesValue,
                include: [
                    {
                        model: Product.ProductAttribute,
                        as: 'attribute_name',
                        attributes: ['name']
                    }
                ],
                as: 'attributes',
                attributes: ['id', 'value', 'price'],
            }
        ],
    })
        .then(data => {

            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving Products."
            });
        });
}