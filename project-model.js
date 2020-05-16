const db = require("./data/db-config.js");

module.exports = {
    getProjects,
    getById,
    addProject,
    getTasks,
    addTask,
    getResources,
    addResource
 
}

function getProjects() {
    return db("projects");
}

function getById(id) {
  return db("projects").where({id}).first();
}

function addProject(project) {
    return db("projects")
      .insert(project, 'id')
      .then(([id])=>{
        return getById(id)
    })
    .catch(error=>{
        console.log(error)
    })
} 


function getTasks(project_id) {
    return db("projects")
    .select('projects.name', 'projects.description', 'tasks.task_description', "tasks.notes", "tasks.task_completed")
      .join('tasks', 'tasks.project_id', "projects.id")
      .where('projects.id', project_id)
  }

  function addTask(task, id) {
    return db("tasks")
      .insert(task, id)
      .then(newTask => {
        return newTask
    })
    .catch(error=>{
        console.log(error)
    })
} 

  function getResources(project_id) {
    return db("projects")
    .select('projects.name', 'resources.resource_name', 'resources.resource_description')
      .join('resources', 'resources.project_id', "projects.id")
      .where('projects.id', project_id)
  }

  function addResource(resource, id) {
    return db("resources")
      .insert(resource, id)
      .then(newResource => {
        return newResource
    })
    .catch(error=>{
        console.log(error)
    })
} 
/*getTasks,
getResources,
addProjects,
addTasks,
addResources*/