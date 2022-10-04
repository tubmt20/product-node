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
        category: {
            type: Sequelize.STRING,
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
        }
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
        code: {
            type: Sequelize.STRING,
            required: true,
            allowNull: false
        }
    });

    Product.hasMany(ProductAttribute, {
        through: ProductAttributesValue
    });
    ProductAttribute.hasMany(ProductAttributesValue,
        {
            foreignKey: 'productattributeId',
            as: 'values'
        });

    return { Product, ProductAttribute, ProductAttributesValue };
};