const crypto = require('crypto')
const Sequelize = require('sequelize')
const db = require('../db')

const User = db.define('user', {
  email: {
    type: Sequelize.STRING,
     unique: true,
    allowNull: false
  },
  password: {
    type: Sequelize.STRING,
    get() {
      return () => this.getDataValue('password')
    }
  },
  salt: {
    type: Sequelize.STRING,
    get() {
      return () => this.getDataValue('salt')
    }
  },
  googleId: {
    type: Sequelize.STRING
  },
  address: {
    type: Sequelize.TEXT,
    validate: {
      notEmpty: true,
    }
  },
  city: {
    type: Sequelize.TEXT,
    validate: {
      notEmpty: true,
    }
  },
  state: {
    type: Sequelize.TEXT,
    validate: {
      notEmpty: true,
    }
  },
  zip: {
    type: Sequelize.TEXT,
    validate: {
      notEmpty: true,
    }
  },
  role: {
    type: Sequelize.ENUM('user', 'admin'), // eslint-disable-line new-cap
    defaultValue: 'user',
    allowNull: false
  }
})

module.exports = User

User.prototype.correctPassword = function(candidatePwd) {
  return User.encryptPassword(candidatePwd, this.salt()) === this.password()
}

User.generateSalt = function() {
  return crypto.randomBytes(16).toString('base64')
}

User.encryptPassword = function(plainText, salt) {
  return crypto
    .createHash('RSA-SHA256')
    .update(plainText)
    .update(salt)
    .digest('hex')
}

const setSaltAndPassword = user => {
  if (user.changed('password')) {
    user.salt = User.generateSalt()
    user.password = User.encryptPassword(user.password(), user.salt())
  }
}

User.beforeCreate(setSaltAndPassword)
User.beforeUpdate(setSaltAndPassword)
