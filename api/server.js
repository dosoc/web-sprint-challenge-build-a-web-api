const express = require('express');
const server = express();
const {logger} = require('./projects/projects-middleware')
const projectsRouter = require('./projects/projects-router')
const actionsRouter = require('./actions/actions-router')

server.use(express.json())

server.use(logger)

server.use('/api/projects', projectsRouter)

server.use('/api/actions', actionsRouter)

module.exports = server;
