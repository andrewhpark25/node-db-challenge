const db = require("./data/db-config.js");

module.exports = {
    getProjects,
    addProject,
    getTasks,
    addTask,
    getResources,
    addResource
 
}

function getProjects() {
    return db("projects");
}

function addProject(project) {
    return db("projects")
      .insert(project)
  }

function getTasks(project_id) {
    return db("projects")
    .select('projects.name', 'projects.description', 'tasks.task_description', "tasks.notes", "tasks.task_completed")
      .join('tasks', 'tasks.project_id', "projects.id")
      .where('projects.id', project_id)
  }

  function addTask(task) {
    return db("tasks")
      .insert(task)
  }

  function getResources(project_id) {
    return db("projects")
    .select('projects.name', 'resources.resource_name', 'resource.resource_description')
      .join('resources', 'resources.project_id', "projects.id")
      .where('projects.id', project_id)
  }

  function addResource(resource) {
    return db("resources")
      .insert(resource)
  }

/*getTasks,
getResources,
addProjects,
addTasks,
addResources*/