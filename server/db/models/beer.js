const Sequelize = require('sequelize')
const db = require('../db')


const Beer = db.define('beer', {
    name: {
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
    abv: {
        type: Sequelize.STRING,
        allowNull: false
    },
    price: {
        type: Sequelize.DECIMAL(10, 2),  // eslint-disable-line new-cap
        allowNull: false,
        validate: {
            notEmpty: true,
            min: 0
        }
    },
    availability: {
        type: Sequelize.ENUM('available', 'pending', 'out of stock'), // eslint-disable-line new-cap
        allowNull: false,
        defaultValue: 'pending'
    },
    imageUrl: {
        type: Sequelize.STRING,
        allowNull: false
      }
})

module.exports = Beer