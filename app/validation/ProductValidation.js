const yup = require("yup");

const productSchema = yup.object({
    body: yup.object({
        name: yup.string().required(),
        code: yup.string().required(),
        category: yup.string().required(),
        thumbnail: yup.string().required(),
        description: yup.string().required(),
        quantity: yup.number().required(),
    })
});

const productUpdateSchema = yup.object({
    body: yup.object({
        name: yup.string(),
        code: yup.string(),
        category_id: yup.number(),
        thumbnail: yup.string(),
        description: yup.string(),
        quantity: yup.number(),
    })
});

module.exports = { productSchema, productUpdateSchema };
