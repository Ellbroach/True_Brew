'use strict ';
const Op = require('sequelize').Op
const router = require('express').Router()
const { Beer, Brewery } = require('../db/models')


router.get('/', (req, res, next) => {
  Brewery.findAll({
    include: [
      {
        model: Beer
      }
    ]
  })
    .then(breweries => {
      res.json(breweries)
    })
    .catch(next)
})

router.get('/search', (req, res, next) => {
  const searchTerm = req.query.q
  Brewery.findAll(
    { where: {
       name: {
            [Op.iLike]: `%${searchTerm}%`
          }
      }
    })
      .then(breweries => res.json(breweries))
      .catch(next)
})

router.get('/:breweryId', (req, res, next) => {
  const id = req.params.breweryId
  Brewery.findById(id, {
    include: [
      {
        attributes: ['name'],
        model: Beer,
        through: {
          attributes: []
        }
      }
    ]
  })
    .then(brewery => res.json(brewery))
    .catch(next)
})

router.post('/', (req, res, next) => {
  let createAll = [];
  let breweryId = null
  Brewery.create(req.body)
    .then(brewery => {
      breweryId = brewery.id
      createAll = req.body.beers.map(beer => {
        Beer.findById(beer.id)
          .then(beerInstance => {
            return brewery.setBeers(beerInstance)
          })
      })
      return Promise.all(createAll)
    })
    .then(() => {
      return Brewery.findById(breweryId, {
        include: [
          {
            attributes: ['name'],
            model: Beer,
            through: {
              attributes: []
            }
          }
        ]
      })}
    )
    .then(brewery => res.status(201).json(brewery))
    .catch(next)
})

router.put('/:breweryId', (req, res, next) => {
  const paramsId = req.params.breweryId
  let updateAll = []
  Brewery.update(req.body, { 
      where: { id: paramsId },
      returning: true,
    })
    .then(([rowsUpdate, [brewery]]) => {
      updateAll = req.body.beers.map(beer => {
        Beer.findAll({
          where: {name: beer.name},
        })
          .then(([beer]) => {
              return brewery.setBeers(beer)
          })
      })
      return Promise.all(updateAll)
    })
    .then(() =>
      Brewery.findById(paramsId, {
        include: [
          {
            attributes: ['name'],
            model: Beer,
            through: {
              attributes: []
            }
          }
        ]
      })
        .then(brewery => {
          res.status(200).json(brewery)
        })
    )
    .catch(next)
})


module.exports = router