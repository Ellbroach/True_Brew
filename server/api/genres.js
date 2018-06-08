'use strict';
const router = require('express').Router()
const { Genre, Show } = require('../db/models')

router.get('/', (req, res, next) => {
    Genre.findAll({

      include: [
        {
          attributes: ['id'],
          model: Show,
          through: {
            attributes:  []
          },
        }
      ]
    })
        .then(categories => res.json(categories))
        .catch(next)
})

router.get('/:genreId', (req, res, next) => {
    const id = req.params.genreId
    Genre.findById(id)
        .then(genre => res.json(genre))
        .catch(next)
})

router.post('/', (req, res, next) => {
    Genre.create(req.body)
        .then(newGenre =>
        res.status(201).json(newGenre)
    ).catch(next)
})


router.put('/:genreId', (req, res, next) => {
    const id = req.params.genreId
    Genre.update(req.body, {
        where: {id},
        returning: true
    })
    .then(([rowsUpdate, [newGenre]]) =>
        res.json(newGenre)
    ).catch(next)
})


router.delete('/:genreId', (req, res, next) => {
    const id = req.params.genreId
    Genre.destroy({
        where: {id}
    })
        .then(() => res.sendStatus(204))
        .catch(next)
})

module.exports = router
