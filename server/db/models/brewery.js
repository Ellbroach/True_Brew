const Sequelize = require('sequelize')
const db = require('../db')

const Brewery = db.define('brewery', {
    name: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    owner: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    description: {
        type: Sequelize.TEXT,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    city: {
        type: Sequelize.STRING,
        allowNull: true
    },
    state: {
        type: Sequelize.STRING,
        allowNull: false
    },
    imageUrl: {
        type: Sequelize.STRING,
        allowNull: false
    },
    ownerImage: {
        type: Sequelize.STRING,
        allowNull: true
    },
    site: {
        type: Sequelize.STRING,
        allowNull: false
    }
})

module.exports = Brewery