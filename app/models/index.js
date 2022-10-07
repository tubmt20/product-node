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

db.users = require("./User.js")(sequelize, Sequelize);
db.products = require("./Product.js")(sequelize, Sequelize);

db.categories = require("./Category.js")(sequelize, Sequelize);
db.products.Product.hasOne(db.categories,
    {
        sourceKey: 'category_id',
        foreignKey: 'id',
    });


module.exports = db;