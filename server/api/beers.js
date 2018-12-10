'use strict ';
const Op = require('sequelize').Op
const router = require('express').Router()
const { Beer, Genre, Review } = require('../db/models')


router.get('/', (req, res, next) => {
  Beer.findAll({
    include: [
      {
        attributes: ['rating'],
        model: Review
      },
      {
        model: Genre
      }
    ]
  })
  .then(beers => {
    for (let beer of beers) {
      beer.dataValues.averageRating = beer.getAverageRating()
    }
    return beers
  })
    .then(beers => {
      res.json(beers)
    })
    .catch(next)
})

router.get('/search', (req, res, next) => {
  const searchTerm = req.query.q
  Beer.findAll(
    { where: {
       name: {
            [Op.iLike]: `%${searchTerm}%`
          }
      }
    })
      .then(beers => res.json(beers))
      .catch(next)
})

router.get('/:beerId', (req, res, next) => {
  const id = req.params.beerId
  Beer.findById(id, {
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
    .then(beer => res.json(beer))
    .catch(next)
})

router.post('/', (req, res, next) => {
  let createAll = [];
  let beerId = null
  Beer.create(req.body)
    .then(beer => {
      beerId = beer.id
      createAll = req.body.genres.map(genre => {
        Genre.findById(genre.id)
          .then(genreInstance => {
            return beer.setGenres(genreInstance)
          })
      })
      return Promise.all(createAll)
    })
    .then(() => {
      return Beer.findById(beerId, {
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
    .then(beer => res.status(201).json(beer))
    .catch(next)
})

router.put('/:beerId', (req, res, next) => {
  const paramsId = req.params.beerId
  let updateAll = []
  Beer.update(req.body, { 
      where: { id: paramsId },
      returning: true,
    })
    .then(([rowsUpdate, [beer]]) => {
      updateAll = req.body.genres.map(genre => {
        Genre.findAll({
          where: {name: genre.name},
        })
          .then(([genre]) => {
            console.log('HERE BIG TEST !!!!!!', beer.setGenres(genre))
              return beer.setGenres(genre)
          })
      })
      return Promise.all(updateAll)
    })
    .then(() =>
      Beer.findById(paramsId, {
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
        .then(beer => {
          res.status(200).json(beer)
        })
    )
    .catch(next)
})

router.delete('/:beerId', (req, res, next) => {
  const id = req.params.beerId
  Beer.destroy({
    where: { id }
  })
    .then(() => res.sendStatus(204))
    .catch(next)
})


module.exports = router