const Sequelize = require('sequelize')
const db = require('../db')


const Show = db.define('show', {
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
    price: {
        type: Sequelize.DECIMAL(10, 2),  // eslint-disable-line new-cap
        allowNull: false,
        validate: {
            notEmpty: true,
            min: 0
        }
    },
    time: {
        type: Sequelize.STRING,
        allowNull: true
    },
    date: {
        type: Sequelize.ARRAY(Sequelize.STRING),
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    availability: {
        type: Sequelize.ENUM('available', 'pending', 'out of stock'), // eslint-disable-line new-cap
        allowNull: false,
        defaultValue: 'pending'
    },
    quantity: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: true,
            min: 0
        }
    },
    imageUrl: {
        type: Sequelize.STRING,
        allowNull: false,
        // validate: {
        //   isUrl: {msg: 'Invalid URL, try again'}
        // }
      },
      imageCaption: {
        type: Sequelize.STRING,
        allowNull: true,
      }
})

module.exports = Show