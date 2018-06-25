'use strict';

const Sequelize = require('sequelize')
const db = require('../db')

const Review = db.define('review', {
    title: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    content: {
        type: Sequelize.TEXT,
        allowNull: false,
    },
    rating: {
        type: Sequelize.INTEGER,
        defaultValue: 5,
        validate: {
            min: 1,
            max: 5
        }
    }
})

module.exports = Review
