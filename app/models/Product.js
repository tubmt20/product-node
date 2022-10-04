module.exports = (sequelize, Sequelize) => {
    const Product = sequelize.define("product", {
        name: {
            type: Sequelize.STRING,
            required: true,
            minLength: [4, 'Name should be minimum of 4 characters'],
            allowNull: false
        },
        code: {
            type: Sequelize.STRING,
            required: true,
            unique: true,
            allowNull: false
        },
        thumbnail: {
            type: Sequelize.TEXT,
            required: true,
            allowNull: false,
            minLength: [8, 'Password should be minimum of 8 characters']
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
    });
    return Product;
};