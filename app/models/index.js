const dbConfig = require("../configs/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    operatorsAliases: 0,
    logging: dbConfig.logging,
    pool: {
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle
    }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.User = require("./User.js")(sequelize, Sequelize);
db.Product = require("./Product.js")(sequelize, Sequelize);

db.Category = require("./Category.js")(sequelize, Sequelize);
db.Role = require("./Role.js")(sequelize, Sequelize);
db.Attribute = require("./Attribute.js")(sequelize, Sequelize);
db.AttributeValue = require("./AttributeValue.js")(sequelize, Sequelize);



Object.keys(db).forEach(function (modelName) {
    if ('associate' in db[modelName]) {
        db[modelName].associate(db);
    }
});

module.exports = db;