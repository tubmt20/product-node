const db = require("../models");
const Product = db.products;
const Op = db.Sequelize.Op;

exports.createProduct = (req, res, next) => {
    const { name, description, price, quantity, category } = req.body;
    if (!name || !description || !price || !quantity || !category) {
        return res.json({ message: 'Please enter all the details' })
    }
    Product.create(req.body)
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