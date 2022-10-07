module.exports = (sequelize, Sequelize) => {
    const Category = sequelize.define("category", {
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
        description: {
            type: Sequelize.STRING,
            required: true,
            allowNull: false
        },
        parent: {
            type: Sequelize.STRING,
            required: false,
            allowNull: true
        }
    }, {
        timestamps: false,
    });
    return Category;
}
