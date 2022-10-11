module.exports = (sequelize, Sequelize) => {
    const AttributeValue = sequelize.define("AttributeValue", {
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
    }, {
        indexes: [{
            fields: [
                'ProductId', 'AttributeId', 'value'
            ], name: 'key_unique_PA', unique: true
        }],
    });
    AttributeValue.associate = (models) => {
        AttributeValue.belongsTo(models.Attribute);
        AttributeValue.belongsTo(models.Product);
    }
    return AttributeValue;
}