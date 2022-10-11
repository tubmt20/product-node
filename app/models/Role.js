module.exports = (sequelize, Sequelize) => {
    const Role = sequelize.define("role", {
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
    }, {
        timestamps: false,
    });

    Role.associate = (models) => {
        Role.hasMany(models.User, {
            foreignKey: 'role_id',
        });
    };
    return Role;
}