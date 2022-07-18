// Write your "actions" router here!
const express = require('express')

const {
    validateActionId,
    validateAction
    } = require('./actions-middlware')

const Actions = require('./actions-model')

const actionsRouter = express.Router()

actionsRouter.get('/', (req, res, next) => {
    Actions.get()
    .then(actions=> {
        res.json(actions)
    })
    .catch(next)
})

actionsRouter.get('/:id', validateActionId, (req, res) => {
    res.json(req.action)
})
actionsRouter.post('/', validateAction, (req, res, next) => {
    Actions.insert(req.body)
    .then(newAction => {
        res.status(201).json(newAction)
    })
    .catch(next)
})
actionsRouter.put('/:id', (req, res) => {

})
actionsRouter.delete('/:id', (req, res) => {

})

module.exports = actionsRouter