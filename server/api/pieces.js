'use strict ';
const Op = require('sequelize').Op
const router = require('express').Router()
const { Piece, Genre } = require('../db/models')


router.get('/', (req, res, next) => {
  Piece.findAll({
    include: [
      {
        model: Genre
      }
    ]
  })
    .then(pieces => {
      res.json(pieces)
    })
    .catch(next)
})

router.get('/search', (req, res, next) => {
  const searchTerm = req.query.q
  Piece.findAll(
    { where: {
       name: {
            [Op.iLike]: `%${searchTerm}%`
          }
      }
    })
      .then(pieces => res.json(pieces))
      .catch(next)
})

router.get('/:pieceId', (req, res, next) => {
  const id = req.params.pieceId
  Piece.findById(id, {
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
    .then(piece => res.json(piece))
    .catch(next)
})

router.post('/', (req, res, next) => {
  let createAll = [];
  let pieceId = null
  Piece.create(req.body)
    .then(piece => {
      pieceId = piece.id
      console.log('req.body: ', req.body);
      createAll = req.body.genres.map(genre => {
        Genre.findById(genre.id)
          .then(genreInstance => {
            return piece.setGenres(genreInstance)
          })
      })
      return Promise.all(createAll)
    })
    .then(() => {
      return Piece.findById(pieceId, {
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
    .then(piece => res.status(201).json(piece))
    .catch(next)
})

router.put('/:pieceId', (req, res, next) => {
  const paramsId = req.params.pieceId
  let updateAll = []
  Piece.update(req.body, { 
      where: { id: paramsId },
      returning: true,
    })
    .then(([rowsUpdate, [piece]]) => {
      updateAll = req.body.genres.map(genre => {
        Genre.findAll({
          where: {name: genre.name},
        })
          .then(([genre]) => {
              return piece.setGenres(genre)
          })
      })
      return Promise.all(updateAll)
    })
    .then(() =>
      Piece.findById(paramsId, {
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
        .then(piece => {
          res.status(200).json(piece)
        })
    )
    .catch(next)
})

router.delete('/:pieceId', (req, res, next) => {
  const id = req.params.pieceId
  Piece.destroy({
    where: { id }
  })
    .then(() => res.sendStatus(204))
    .catch(next)
})


module.exports = router