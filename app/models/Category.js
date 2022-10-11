module.exports = (sequelize, Sequelize) => {
    const Category = sequelize.define("Category", {
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
        timestamps: false
    });

    // Category.associate = models => {
    //     Category.hasMany(models.product, {
    //         foreignKey: 'category_id',
    //     });
    // }

    Category.associate = (models) => {
        Category.hasMany(models.Product, {
            foreignKey: 'category_id',
        });
    };
    return Category;
}
