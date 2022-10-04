const db = require("../models");
const Product = db.products;
const Op = db.Sequelize.Op;

exports.createProduct = (req, res, next) => {
    const { code, name, description, price, quantity, category } = req.body;
    if (!code || !name || !description || !price || !quantity || !category) {
        return res.json({ message: 'Please enter all the details' })
    }
    Product.product.create(req.body)
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

exports.showListProduct = (req, res, next) => {
    Product.Product.findAll({
        include: [
            {
                model: Product.ProductAttribute,
                include: [
                    {
                        model: Product.ProductAttributesValue,
                        as: 'values',
                        attributes: ['value']
                    }
                ],
                attributes: ['name', 'code']
            }
        ]
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
