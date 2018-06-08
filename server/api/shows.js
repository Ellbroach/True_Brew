'use strict ';
const Op = require('sequelize').Op
const router = require('express').Router()
const { Show, Genre } = require('../db/models')


router.get('/', (req, res, next) => {
  Show.findAll({
    include: [
      {
        model: Genre
      }
    ]
  })
    .then(shows => {
      res.json(shows)
    })
    .catch(next)
})

router.get('/search', (req, res, next) => {
  const searchTerm = req.query.q
  Show.findAll(
    { where: {
       name: {
            [Op.iLike]: `%${searchTerm}%`
          }
      }
    })
      .then(shows => res.json(shows))
      .catch(next)
})

router.get('/:showId', (req, res, next) => {
  const id = req.params.showId
  Show.findById(id, {
    include: [
      {
        attributes: ['name'],
        model: Genre,
        through: {
          attributes: []
        }
      }
    ]
  })
    .then(show => res.json(show))
    .catch(next)
})

router.post('/', (req, res, next) => {
  let createAll = [];
  let showId = null
  Show.create(req.body)
    .then(show => {
      showId = show.id
      console.log('req.body: ', req.body);
      createAll = req.body.genres.map(genre => {
        Genre.findById(genre.id)
          .then(genreInstance => {
            return show.setGenres(genreInstance)
          })
      })
      return Promise.all(createAll)
    })
    .then(() => {
      return Show.findById(showId, {
        include: [
          {
            attributes: ['name'],
            model: Genre,
            through: {
              attributes: []
            }
          }
        ]
      })}
    )
    .then(show => res.status(201).json(show))
    .catch(next)
})

router.put('/:showId', (req, res, next) => {
  const paramsId = req.params.showId
  let updateAll = []
  Show.update(req.body, { 
      where: { id: paramsId },
      returning: true,
    })
    .then(([rowsUpdate, [show]]) => {
      updateAll = req.body.genres.map(genre => {
        Genre.findAll({
          where: {name: genre.name},
        })
          .then(([genre]) => {
              return show.setGenres(genre)
          })
      })
      return Promise.all(updateAll)
    })
    .then(() =>
      Show.findById(paramsId, {
        include: [
          {
            attributes: ['name'],
            model: Genre,
            through: {
              attributes: []
            }
          }
        ]
      })
        .then(show => {
          res.status(200).json(show)
        })
    )
    .catch(next)
})

router.delete('/:showId', (req, res, next) => {
  const id = req.params.showId
  Show.destroy({
    where: { id }
  })
    .then(() => res.sendStatus(204))
    .catch(next)
})


module.exports = router