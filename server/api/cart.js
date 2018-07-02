const router = require('express').Router()
const { Order, LineItem, Beer } = require('../db/models')
const nodemailer = require('nodemailer');
const Op = require('sequelize').Op

module.exports = router

function makeCart(req, next) {
  const cartResult = Order.cartForUser(req.user)
  cartResult.then((cart) => {
    req.cart = Array.isArray(cart) ? cart[0] : cart
    req.session.cartId = req.cart.id
    return next()
  })
}

function withCart(req, res, next) {
  if (req.cart) return next()
  if (req.session.cartId) {
    const order = Order.findOne( {
      where: {
        status: 'cart',
        id: req.session.cartId,
        },
        include: [
            Beer
        ]
      }
    )
    order.then(cart => {
      if (cart === null) {
        req.session.cartId = undefined;
        return makeCart(req, next)
      } else {
        req.cart = cart
        return next()
      }
    })
    .catch(next)

  } else {
    makeCart(req, next)
  }
}

router.use('/', withCart)
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
         user: process.env.GMAIL_USERNAME,
         pass: process.env.GMAIL_PASSWORD
     }
 });


router.post('/checkout', (req, res, next) => {
  const body = req.cart.beers.reduce((tableBody, beer) => {
    const lineItem = beer.lineItem
    return tableBody + `<tr><td>${beer.name}</td><td>$${beer.price}</td>${lineItem.quantity}<td></td><td>$${beer.price * lineItem.quantity}</td></tr>\n`
  }, '')
  const mailOptions = {
    from: process.env.GMAIL_USERNAME, // sender address
    to: req.user.email, // list of receivers
    subject: 'Thank you for your order', // Subject line
    html: ` You paid $${req.body.price}
      <table>
        <thead>
          <tr>
            <td>Basket</td>
            <td>Price</td>
            <td>Quantity</td>
            <td>SubTotal</td>
          </tr>
        </thead>
        <tbody>
          ${body}
        </tbody>
      </table>
    `
  };
  transporter.sendMail(mailOptions, function (err, info) {
    if (err) {res.send(err)}
    else {
      try {
        const result = req.cart.setUser(req.user)
        result.then(() => req.cart.update({status: 'paid'})) //update paid
        .then(() => {
          req.cart = undefined
          req.session.cartId = undefined
          return res.send(info)
        })
        .catch(console.error.bind(console, 'This failed'))
      } catch (tErr) {
        console.error(tErr)
      }
    }
  });
})

router.get('/', (req, res, next) => {
  const cartId = req.cart.id
  Order.findById(cartId, {
    include: [{
      model: LineItem
    }, {
      model: Beer
    }]
  })
    .then(cart => res.json(cart))
    .catch(next)
})

router.post('/', (req, res, next) => {
  const orderId = req.cart.id
  const { beerId, quantity } = req.body;
  console.log('HELLO!!!!', beerId, quantity)
  LineItem.create({ beerId, quantity, orderId })
    .then(() => {
      return Order.findById(orderId, {
        include: [{
          model: LineItem
        }, {
          model: Beer
        }]
      })
      .then(cart => {
        res.json(cart)
      })
      .catch(next)
    })
    .catch(next)
});

router.delete('/item/:beerId', (req, res, next) => {
  const beerId = req.params.beerId
  const orderId = req.cart.id

  LineItem.destroy({ where: { beerId, orderId } })
    .then(() => {
      res.status(204).send('Item deleted successfully. ' + beerId + ' ' + orderId)})
    .catch(next)
})
