
module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("user", {
        name: {
            type: Sequelize.STRING,
            required: true,
            allowNull: false
        },
        firstName: {
            type: Sequelize.STRING,
            required: true,
            get() {
                return this.getDataValue('name').split(' ')[0];
            }
        },
        lastName: {
            type: Sequelize.STRING,
            required: true,
            get() {
                return this.getDataValue('name').replace(this.getDataValue('name').split(' ')[0], '');
            }
        },
        email: {
            type: Sequelize.STRING,
            required: true,
            allowNull: false
        },
        password: {
            type: Sequelize.STRING,
            required: true,
            allowNull: false
        },
        role: {
            type: Sequelize.STRING,
            required: true,
            allowNull: false,
        },
        token: {
            type: Sequelize.TEXT,
            required: false
        }
    });
    return User;
};