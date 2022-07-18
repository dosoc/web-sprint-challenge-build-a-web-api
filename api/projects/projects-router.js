// Write your "projects" router here!
const express = require('express')

const {
    validateProjectID,
    validateProject
} = require('./projects-middleware')

const Projects = require('./projects-model')

const projectsRouter = express.Router();

projectsRouter.get('/', (req, res, next) => {
    Projects.get()
    .then(projects => {
        res.json(projects)
    })
    .catch(next)
});

projectsRouter.get('/:id', validateProjectID, (req, res) => {
    res.json(req.project)
})

projectsRouter.post('/', validateProject, (req, res, next) => {
    Projects.insert(req.body)
    .then(newProject => {
        res.status(201).json(newProject)
    })
    .catch(next)
})

projectsRouter.put('/:id', (req, res) => {

})

projectsRouter.delete('/:id', (req, res) => {

})

projectsRouter.get('/:id/actions', (req, res) => {

})

projectsRouter.use((err, req, res, next) => {
    res.status(err.status || 500).json({
        customMessage: 'something happened inside the router',
        message: err.message,
        stack: err.stack
    })
})

module.exports = projectsRouter