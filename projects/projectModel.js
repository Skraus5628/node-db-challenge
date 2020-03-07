const db = require('../data/db-config')

function getProjects() {
  return db('projects');
}

function addProject(project) {
  return db('projects')
    .insert(project)
    .then(ids => {
      return findById(ids[0])
    });
}

function getAllResources() {
  return db('resources')
}

function addResource(resource) {
  return db('resources')
    .insert(resource)
}

function findByProjectId(id) {
  return db('projects').where({ id }).first()
}

function findByTaskId(id) {
    return db('tasks').where({ id }).first()
}

function findByResourceId(id) {
    return db('resources').where({ id }).first()
}
  

function getTasks(id) {
  return db("projects")
    .join('tasks', 'tasks.project_id', 'projects.id')
    .select('*')
    .where({ 'tasks.project_id': id });
}

function getResourceByTaskId(id) {
    return db("projects")
      .join('resources', 'tasks.project_id', 'resources.id')
      .select('*')
      .where({ 'resources.project_id': id });
  }

function addTask(task) {
  return db('tasks')
    .insert(task)
}

function updateProject(changes, id){
    return db('projects')
    .update(changes)
    .where("id", id)
}

function updateTasks(changes, id){
    return db('tasks')
    .update(changes)
    .where("id", id)
}
function updateResource(changes, id){
    return db('resources')
    .update(changes)
    .where("id", id)
}

function removeProject(id){
    return db('projects')
    .del()
    .where("id", id)
}

function removeTask(id){
    return db('tasks')
    .del()
    .where("id", id)
}

function removeResource(id){
    return db('resources')
    .del()
    .where("id", id)
}


module.exports = {
  getProjects,
  addProject,
  getAllResources,
  addResource,
  getTasks,
  addTask,
  updateProject,
  updateTasks,
  updateResource,
  removeProject,
  removeTask,
  removeResource,
  findByProjectId,
  findByTaskId,
  findByResourceId,
  getResourceByTaskId,
};