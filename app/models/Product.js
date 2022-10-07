const moment = require('moment');
module.exports = (sequelize, Sequelize) => {
    const Product = sequelize.define("product", {
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
            set() {
                this.setDataValue('created_at', new Date());
            },
            get() {
                return moment(this.getDataValue('created_at')).format('DD-MM-YYYY HH:mm:ss');
            }
        },
        updated_at: {
            type: Sequelize.DATE,
            required: true,
            allowNull: true,
            set() {
                this.setDataValue('updated_at', new Date());
            },
            get() {
                return moment(this.getDataValue('updated_at')).format('DD-MM-YYYY HH:mm:ss');
            }
        },
    }, {
        timestamps: false,
    });
    const ProductAttribute = sequelize.define("productattribute", {
        name: {
            type: Sequelize.STRING,
            required: true,
            allowNull: false
        },
        code: {
            type: Sequelize.STRING(20),
            required: true,
            allowNull: false
        }
    }, {
        timestamps: false,
        createdAt: false
    });
    const ProductAttributesValue = sequelize.define("productattributevalue", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            required: true,
            allowNull: false
        },
        value: {
            type: Sequelize.STRING,
            required: true,
            allowNull: false
        },
        price: {
            type: Sequelize.DOUBLE,
            defaultValue: 0
        },
        code: {
            type: Sequelize.STRING,
            required: true,
            allowNull: false
        }
    });

    Product.belongsToMany(ProductAttribute, {
        through: ProductAttributesValue,
        unique: false
    });
    ProductAttribute.belongsToMany(Product, {
        through: ProductAttributesValue,
        unique: false
    });
    Product.hasMany(ProductAttributesValue,
        {
            foreignKey: 'productId',
            as: 'attributes'
        });
    ProductAttributesValue.belongsTo(ProductAttribute,
        {
            foreignKey: 'productattributeId',
            as: 'attribute_name'
        });
    // Product.associate = models => {
    //     Product.hasOne(models.categories);
    // }
    return { Product, ProductAttribute, ProductAttributesValue };
};