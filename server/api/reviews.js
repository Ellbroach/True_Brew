'use strict ';

const router = require('express').Router()
const { Review } = require('../db/models')
module.exports = router

router.get('/', (req, res, next) => {
    Review.findAll()
        .then(reviews => res.json(reviews))
        .catch(next)
})

router.get('/:reviewId', (req, res, next) => {
    const id = req.params.reviewId
    Review.findById(id)
        .then(review => res.json(review))
        .catch(next)
})

router.post('/', (req, res, next) => {
    Review.create(req.body)
        .then(review =>
            res.status(201).json(review)
        )
        .catch(next)
})

router.put('/:reviewId', (req, res, next) => {
    const id = req.params.reviewId
    Review.update(req.body, {
        where: { id },
        returning: true,
    })
        .then(([rowsUpdate, [review]]) =>
            res.json(review)
        )
        .catch(next)
})

router.delete('/:reviewId', (req, res, next) => {
    const id = req.params.reviewId
    Review.destroy({
        where: { id }
    })
        .then(() => res.sendStatus(204))
        .catch(next)
})
