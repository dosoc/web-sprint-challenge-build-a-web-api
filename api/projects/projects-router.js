// Write your "projects" router here!
const express = require('express')

const {
    validateProjectID,
    validateProject,
    validateProjectCompleted
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

projectsRouter.put('/:id', validateProjectID, validateProject, (req, res, next) => {
    Projects.update(req.params.id, req.body)
    .then(()=> {
        return Projects.get(req.params.id)
    })
    .then(updatedProject => {
        res.status(201).json(updatedProject)
    })
    .catch(next)
})

projectsRouter.delete('/:id', validateProjectID, async (req, res, next) => {
    try{
        await Projects.remove(req.params.id)
        res.json(req.project)
    } catch (err) {
        next(err)
    }
})

projectsRouter.get('/:id/actions', validateProjectID, async (req, res, next) => {
    try {
        const result = await Projects.getProjectActions(req.params.id)
        res.json(result)
    } catch (err){
        next(err)
    }
})

projectsRouter.use((err, req, res, next) => {
    res.status(err.status || 500).json({
        customMessage: 'something happened inside the router',
        message: err.message,
        stack: err.stack
    })
})

module.exports = projectsRouter