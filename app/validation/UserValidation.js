const yup = require("yup");


const userSchema = yup.object({
  body: yup.object({
    name: yup.string().required(),
    email: yup.string().email().required(),
    password: yup.string().required(),
    role_id: yup.number().required(),
  })
});

module.exports = { userSchema };
