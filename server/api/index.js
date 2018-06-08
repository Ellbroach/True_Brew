const router = require('express').Router()
module.exports = router

router.use('/users', require('./users'))
router.use('/shows', require('./shows'))
router.use('/genres', require('./genres'))


router.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})
