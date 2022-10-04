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

module.exports = { productSchema };
