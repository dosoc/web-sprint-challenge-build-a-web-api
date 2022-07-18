const express = require('express');
const server = express();
const {logger} = require('./projects/projects-middleware')
const projectsRouter = require('./projects/projects-router')

server.use(express.json())

server.use(logger)

server.use('/api/projects', projectsRouter)
// Configure your server here
// Build your actions router in /api/actions/actions-router.js
// Build your projects router in /api/projects/projects-router.js
// Do NOT `server.listen()` inside this file!

module.exports = server;
