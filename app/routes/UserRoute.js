const authorize = require('../middlewares/authorize');
const validate = require('../validation/validate');
const userValidation = require('../validation/UserValidation');

module.exports = app => {
    const users = require("../controllers/UserController.js");

    var router = require("express").Router();

    router.post("/register", validate(userValidation.userSchema), users.create);

    router.post("/login", users.login);

    router.get("/show", authorize(['Admin']), users.findAll);

    router.get("/profile", users.findOne);

    router.put("/:id", users.update);

    router.delete("/:id", users.delete);

    app.use('/api/user', router);
};