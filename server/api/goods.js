const router = require('express').Router()
const models = require('models')
const errors = require('errors')

router
// admin
.get('/', (req, res, next) => {
  models.good.findAll()
  .then(goods => res.json(goods))
  .catch(next)
})
.post('/', (req, res, next) => {
  models.good.create(req.body)
  .then(good => res.json(good))
  .catch(next)
})
.put('/:id', (req, res, next) => {
  Object.assign(req.body, req.params)
  
  models.good.findById(req.params.id)
  .then(good => good.update(req.body))
  .then(good => res.json(good))
  .catch(next)
})
.delete('/:id', (req, res, next) => {
  models.good.findById(req.params.id)
  .then(good => good.destroy())
  .then(good => res.json(good))
  .catch(next)
})

module.exports = router
