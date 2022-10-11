const yup = require("yup");

const productSchema = yup.object({
    body: yup.object({
        name: yup.string().required(),
        code: yup.string().required(),
        category_id: yup.number().required(),
        // thumbnail: yup.string().required(),
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

const AttributeValueSchema = yup.object({
    body: yup.array().of(yup.object().shape({
        code: yup.string().required(),
        value: yup.string().required(),
        AttributeId: yup.number().required(),
        ProductId: yup.number().required(),
    })),
})

module.exports = { productSchema, productUpdateSchema, AttributeValueSchema };
