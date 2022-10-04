const authorize = require('../middlewares/authorize');
const validate = require('../validation/validate');
const productValidator = require('../validation/ProductValidation');

module.exports = app => {
    const products = require("../controllers/ProductController.js");

    var router = require("express").Router();

    router.post("/create", authorize(['Admin']), products.createProduct);
    router.post("/createProductAttribute", authorize(['Admin']), products.createProductAttribute);
    router.post("/createProductAttributeValue", authorize(['Admin']), products.createProductAttributeValue);
    router.get("/showListProduct", products.showListProduct);

    app.use('/api/product', router);
}