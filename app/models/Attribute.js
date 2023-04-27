module.exports = (sequelize, Sequelize) => {
    const Attribute = sequelize.define("Attribute", {
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
    Attribute.associate = (models) => {
        Attribute.belongsToMany(models.Product, {
            through: models.AttributeValue,
            unique: false
        });
    }
    return Attribute;
}

