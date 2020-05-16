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
    const {id} = req.params;

    Projects.addProject(projectData, id)
    .then(id => {
        if(projectData.name) {
          res.status(201).json({ created: id[0] });
           
        }  else {
          res.status(404).json({
            message: 'Please enter a name'
          })
        }}
        )
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
    const {id} = req.params
  
    Projects.getById(id)
    .then(project => {

      if(project) {
        Projects.addTask(taskData, id)
        .then(task => {
          if(taskData.tasks_description && taskData.project_id) {
            res.status(201).json(task);
        } else {
          res.status(404).json({error:"Description is required"})
         
        }})
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
    const {id} = req.params
  
    Projects.getById(id)
    .then(project => {

      if(project) {
        Projects.addResource(resourceData, id)
        .then(resource => {
          if(resourceData.resource_name && resourceData.project_id) {
            res.status(201).json(resource);
        } else  {
          res.status(404).json({error:"name is required"})
         
        }})
      }})
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: "There was an error while saving the resource to the database"})
        })
  });
  
module.exports = router;