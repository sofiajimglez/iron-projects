const Project = require('../models/project.model');
const createError = require('http-errors');

module.exports.exists = (req, res, next) => {
  const projectId = req.params.projectId || req.params.id;
  Project.findById(projectId) 
    .then((project) => {
      if (project) {
        req.project = project;
      } else {
        next(createError(404, 'Project not found'));
      }
    })
    .catch(next);
}