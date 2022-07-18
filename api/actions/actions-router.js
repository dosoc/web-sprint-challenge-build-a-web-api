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
actionsRouter.put('/:id', validateActionId, validateAction, (req, res, next) => {
    Actions.update(req.params.id, req.body)
    .then(()=> {
        return Actions.get(req.params.id)
    })
    .then(updatedAction => {
        res.status(201).json(updatedAction)
    })
    .catch(next)
})
actionsRouter.delete('/:id', validateActionId, async (req, res) => {
    try{
        await Actions.remove(req.params.id)
        res.json(req.user)
    } catch (err) {
        next(err)
    }
})

module.exports = actionsRouter