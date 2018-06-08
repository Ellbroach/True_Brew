const Sequelize = require('sequelize')
const db = require('../db')

const Genre = db.define('genre', {
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
    }
})

module.exports = Genre;