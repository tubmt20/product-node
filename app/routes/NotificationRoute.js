module.exports = app => {
    const noti = require("../controllers/NotificationController.js");

    var router = require("express").Router();

    router.get("/", noti.Send);

    app.use('/api/noti', router);
};