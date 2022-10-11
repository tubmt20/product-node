const authorize = require('../middlewares/authorize');
const validate = require('../validation/validate');
var multer = require('multer');
var upload = multer();

const { productSchema, productUpdateSchema, AttributeValueSchema } = require('../validation/ProductValidation');

module.exports = app => {
    const products = require("../controllers/ProductController.js");

    var router = require("express").Router();

    router.post("/create", authorize(['Admin']), validate(productSchema), products.createProduct);
    router.post("/createProductAttribute", authorize(['Admin']), products.createProductAttribute);
    router.post("/createAttributeValue", authorize(['Admin']), validate(AttributeValueSchema), products.createAttributeValue);
    router.get("/showListProduct", products.showListProduct);
    router.get("/searchProduct", products.searchProducts);
    router.post("/importAttributeValue", upload.single("file"), products.importAttributeValue);

    app.use('/api/product', router);
}