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
      },
    brewery: {
        type: Sequelize.STRING,
        allowNull: false
    },
    type: {
        type: Sequelize.ENUM('IPA', 'Imperial IPA', 'Session IPA', 'White Ale', 'Lager', 'Stout', 'Pale Ale', 
        'Amber Ale', 'Golden Ale', 'Brown Ale', 'Kolsch', 'Pilsner',
        'Saison', 'Wheat', 'Tripel', 'Trappist', 'Sour'),
        allowNull: false
    }
})

Beer.prototype.getAverageRating = function(){
    if (this.reviews === undefined){
      return undefined
    } else if (!this.reviews.length){
      return null
    }
    const avg = this.reviews.reduce((sum, review) => sum + review.rating, 0) / this.reviews.length
    return avg.toFixed(1)
  }

module.exports = Beer