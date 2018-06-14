const router = require('express').Router()
module.exports = router

router.use('/users', require('./users'))
router.use('/beers', require('./beers'))
router.use('/genres', require('./genres'))
router.use('/breweries', require('./breweries'))


router.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})
