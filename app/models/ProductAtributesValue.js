module.exports = (sequelize, Sequelize) => {
    const ProductAttributesValue = sequelize.define("productattribute", {
        name: {
            type: Sequelize.STRING,
            required: true,
            allowNull: false
        },
        product_id: {
            type: Sequelize.INTEGER,
            required: true,
            allowNull: false
        },
        attribute_id: {
            type: Sequelize.INTEGER,
            required: true,
            allowNull: false
        },
        code: {
            type: Sequelize.STRING,
            required: true,
            allowNull: false
        }
    }, {

    });
    return ProductAttributesValue;
};