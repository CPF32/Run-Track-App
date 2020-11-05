const express = require('express')
const passport = require('passport')
const Run = require('../models/run')

const customErrors = require('../../lib/custom_errors')
const handle404 = customErrors.handle404
const requireOwnership = customErrors.requireOwnership

const removeBlanks = require('../../lib/remove_blank_fields')
const requireToken = passport.authenticate('bearer', { session: false })

const router = express.Router()

// CREATE
router.post('/runs', requireToken, (req, res, next) => {
  req.body.run.owner = req.user.id

  Run.create(req.body.run)
    .then(run => {
      res.status(201).json({ example: run.toObject() })
    })
    .catch(next)
})

// INDEX
router.get('/runs', requireToken, (req, res, next) => {
  Run.find()
    .then(runs => {
      return runs.map(run => run.toObject())
    })
    .then(runs => res.status(200).json({ runs: runs }))
    .catch(next)
})

// UPDATE
router.patch('/runs/:id', requireToken, removeBlanks, (req, res, next) => {
  delete req.body.run.owner

  Run.findById(req.params.id)
    .then(handle404)
    .then(run => {
      requireOwnership(req, run)
      return run.updateOne(req.body.run)
    })
    .then(() => res.sendStatus(204))
    .catch(next)
})

// DESTROY
router.delete('/runs/:id', requireToken, (req, res, next) => {
  Run.findById(req.params.id)
    .then(handle404)
    .then(run => {
      requireOwnership(req, run)
      run.deleteOne()
    })
    .then(() => res.sendStatus(204))
    .catch(next)
})

module.exports = router
