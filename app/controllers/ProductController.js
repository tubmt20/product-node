const db = require("../models");
const Product = db.Product;
const Attribute = db.Attribute;
const AttributeValue = db.AttributeValue;
const reader = require('xlsx');
const Category = db.Category;
const Op = db.Sequelize.Op;
const fs = require('fs');
const utils = require('../utils');

exports.createProduct = async (req, res, next) => {
    data = req.body;
    var datum = await db.User.findByPk(utils.userID(req.headers.authorization))
        .then(data => {
            return data;
        });
    data.user_name = datum.name;
    Product.create(data)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the Product."
            });
        });
}

exports.importAttributeValue = async (req, res, next) => {
    const file = req.file;
    const arr = ['A1', 'B1', 'C1', 'D1', 'E1'];
    const arr_data = [];
    const define_header = {
        'code': 'code',
        'Giá trị': 'value',
        'Mã sản phẩm': 'ProductId',
        'Mã thuộc tính': 'AttributeId',
        'Giá sản phẩm': 'price'
    };
    const path = __dirname.replace('controllers', 'assets') + '/' + file.originalname;
    try {
        fs.writeFileSync(path, file.buffer);
        const workbook = reader.readFile(path);
        const sheet_name_list = workbook.SheetNames;
        const reqHeaders = workbook.Sheets[sheet_name_list[0]];
        const xlData = reader.utils.sheet_to_json(reqHeaders);

        xlData.forEach(element => {
            const test = utils.loadData(element, define_header, arr, reqHeaders);
            if (test) {
                arr_data.push(test);
            }
        });
        if (typeof arr_data[0] === 'string') next(arr_data[0]);
        arr_data.forEach(async element => {
            const result = await AttributeValue.upsert(element);
            console.log(result);
        })
    } catch (err) {
        console.error(err);
    }
}

exports.createProductAttribute = (req, res, next) => {
    const { code, name, } = req.body;
    if (!code || !name) {
        return res.json({ message: 'Please enter all the details' })
    }
    Attribute.create(req.body)
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

exports.createAttributeValue = async (req, res, next) => {
    let { countError, countSuccess } = await addData(req.body);
    setTimeout(
        () => {
            if (countError.length > 0) {
                res.status(500).send({
                    message: "Some error occurred while creating the Attribute.",
                    total_err: countError.length,
                    data_err: countError
                });
            } else {
                res.status(201).send({
                    message: "Created successfully",
                    data: countSuccess
                });
            }
        },
        1000
    )
}

async function addData(data) {
    let countError = [];
    let countSuccess = [];
    await data.forEach(async value => {
        try {
            await AttributeValue.create(value);
            countSuccess.push({
                code: value.code,
                price: value.price,
            });
        } catch (e) {
            countError.push({
                data: value,
                error: e.message
            });
        }
    });
    return { countSuccess, countError };
}

exports.showListProduct = async (req, res, next) => {
    const { limit, page } = req.query;
    Product.findAndCountAll({
        include: [{
            model: Category
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
    const queryAttributes = [];
    const limit1 = limit ? limit : 10;
    const page1 = page ? page : 1;
    if (id) query.push({ id: id });
    if (name) query.push({ name: { [Op.like]: `%${name}%` } });
    if (price) queryAttributes.push({ price: { [Op.lte]: price } });
    if (user_name) query.push({ user_name: { [Op.like]: `%${user_name}%` } });
    Product.findAndCountAll({
        where: {
            [Op.and]: [
                ...query
            ]
        },
        include: [{
            where: {
                [Op.and]: [
                    ...queryAttributes
                ]
            },
            model: AttributeValue,
            include: [{
                model: Attribute,
                attributes: ['name']
            }],
            as: 'attributes',
            attributes: ['id', 'value', 'price'],
        }, {
            model: Category,
            // attributes: [[Sequelize.col('description'), 'costKey']]
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
                    console.log(value.dataValues);
                    value.dataValues.Attribute = value.dataValues.Attribute.name;
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
    Product.update(req.body, {
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