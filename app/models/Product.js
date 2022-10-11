const moment = require('moment');
module.exports = (sequelize, Sequelize) => {
    const Product = sequelize.define("Product", {
        name: {
            type: Sequelize.STRING,
            required: true,
            allowNull: false
        },
        code: {
            type: Sequelize.STRING,
            required: true,
            allowNull: false
        },
        category_id: {
            type: Sequelize.INTEGER,
            required: true,
        },
        thumbnail: {
            type: Sequelize.TEXT,
            required: true,
        },
        description: {
            type: Sequelize.STRING,
            required: false
        },
        quantity: {
            type: Sequelize.INTEGER,
            required: true,
            allowNull: false
        },
        user_name: {
            type: Sequelize.STRING,
        },
        created_at: {
            type: Sequelize.DATE,
            required: true,
            allowNull: true,
            defaultValue: Sequelize.NOW,
            get() {
                return moment(this.getDataValue('created_at')).format('DD-MM-YYYY HH:mm:ss');
            }
        },
        updated_at: {
            type: Sequelize.DATE,
            required: true,
            allowNull: true,
            defaultValue: Sequelize.NOW,
            get() {
                return moment(this.getDataValue('updated_at')).format('DD-MM-YYYY HH:mm:ss');
            }
        },
    }, {
        timestamps: false,
        indexes: [
            { fields: ['code'], name: 'code_unique', unique: true }
        ]
    });

    Product.associate = models => {
        Product.belongsToMany(models.Attribute, {
            through: models.AttributeValue,
            unique: false
        });
        Product.hasMany(models.AttributeValue,
            {
                foreignKey: 'ProductId',
                as: 'attributes'
            });

        Product.belongsTo(models.Category, {
            foreignKey: 'category_id',
        });
    }
    return Product;
};