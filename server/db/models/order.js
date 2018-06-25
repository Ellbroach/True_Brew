const Sequelize = require('sequelize')
const db = require('../db')

const Order = db.define('order', {
  status: {
    type: Sequelize.ENUM('cart', 'paid', 'shipped'), // eslint-disable-line new-cap
    allowNull: false,
    defaultValue: 'cart',
    validate: {
      notEmpty: true
    }
  }
});

Order.cartForUser = function (user) {
  if (!user) {
    return Order.create();
  } else {
    return Order.findOrCreate({
      where: {
        userId: user.id,
        status: 'cart',
      }
    })
  }
}

module.exports = Order
