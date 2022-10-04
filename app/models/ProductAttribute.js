module.exports = (sequelize, Sequelize) => {
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
    return ProductAttribute;
};