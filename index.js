const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require('dotenv');

dotenv.config({ path: './app/configs/config.env' });

const app = express();

var corsOptions = {
    origin: "http://localhost:8081"
};

const db = require("./app/models");
db.sequelize.sync({ alter: true });

app.use(cors(corsOptions));

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.json({ message: "Welcome!!!" });
});

require("./app/routes/UserRoute")(app);
require("./app/routes/ProductRoute")(app);


// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});