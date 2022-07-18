// add middlewares here related to actions
const Actions = require('./actions-model')

async function validateActionId(req, res, next) {
    try {
        const action = await Actions.get(req.params.id)
        if (!action) {
            res.status(404).json({
                message: 'action not found'
            })
        } else {
            req.action = action
            next()
        }
    } catch (err) {
        res.status(500).json({
            message: 'problem finding action'
        })
    }
}

function validateAction(req, res, next) {
    const { project_id, description, notes } = req.body
    if (!project_id || !description || !notes) {
        res.status(400).json({
            message: 'missing required fields'
        })
    } else {
        next()
    }
}

module.exports = {
    validateActionId,
    validateAction
}