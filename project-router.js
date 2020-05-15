const express = require('express');

const Projects = require('./project-model.js');

const router = express.Router();

router.get('/', (req, res) => {
  Projects.getProjects()
  .then(projects => {
    res.json(projects);
  })
  .catch(err => {
    res.status(500).json({ message: 'Failed to get projects' });
  });
});

router.post('/', (req, res) => {
    const projectData = req.body;
  
    Projects.addProject(projectData)
    .then(project => {
        if(!projectData.name) {
            res.status(404).json({
                message: 'Please enter a name'
            })
        }  else {
        res.status(201).json(project);
       }
    }) 
    .catch (err => {
      res.status(500).json({ message: 'Failed to create new project' });
    });
  });

  router.get('/:id/tasks', (req, res) => {
    const { id } = req.params;
  
    Projects.getTasks(id)
    .then(tasks => {
      if (tasks.length > 0) {
        res.status(201).json(tasks);
      } else {
        res.status(404).json({ message: 'Could not find tasks for given project' })
      }
    })
    .catch(err => {
      res.status(500).json({ message: 'Failed to get tasks' });
    });
  });

  router.post('/:id/tasks', (req, res) => {

    const taskData = req.body;
  
    Projects.addTask(taskData)
    .then(task => {

        if(!taskData.task_description) {
            res.status(404).json({message:"Description is required"})
        } else {
       
            res.status(201).json(task);
        }})
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: "There was an error while saving the task to the database"})
        })
  });
  
  router.get('/:id/resources', (req, res) => {
    const { id } = req.params;
  
    Projects.getResources(id)
    .then(resources => {
      if (resources.length > 0) {
        res.status(201).json(resources);
      } else {
        res.status(404).json({ message: 'Could not find resources for given project' })
      }
    })
    .catch(err => {
      res.status(500).json({ message: 'Failed to get resources' });
    });
  });

  router.post('/:id/resources', (req, res) => {

    const resourceData = req.body;
  
    Projects.addResource(resourceData)
    .then(resource => {

        if(!resourceData.resource_name) {
            res.status(404).json({message:"name is required"})
        } else {
       
            res.status(201).json(resource);
        }})
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: "There was an error while saving the resource to the database"})
        })
  });
  
module.exports = router;