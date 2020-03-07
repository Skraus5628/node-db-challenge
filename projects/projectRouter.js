const express = require('express');

const db = require('./projectModel');

const router = express.Router();

//                                --GET Requests--

// GET all projects
router.get('/', async (req, res) => {
  try { 
      db.getProjects()
        .then(projects => {
            projects.map(project => {
            project.project_completed = project.project_completed === true;
        });
      res.status(200).json(projects);
    })
        }  catch(err){
            next(err)
        }
});

// GET Task by project ID
router.get('/:id/tasks', async (req, res) => {
  try{
      db.getTasks(req.params.id)
    .then(tasks => {
        tasks.map(task => {
        task.task_completed = task.task_completed === true;
        });
    res.status(200).json(tasks);
  })
    }  catch(err){
        next(err)
    }
});


// GET all resources
router.get('/resources', async (req, res) => {
  try {
      db.getAllResources()
        .then(resources => {
        res.status(200).json(resources);
        })
    } catch(err){
        next(err)
    }
});


//                                --POST requests--

// POST new project
router.post('/', async (req, res) => {
  try{    
      const project = req.body;
        db.addProject(project)
        .then(() => {
            db.getProjects()
            .then(projects => {
                projects.map(project => {
                project.project_completed = project.project_completed === true;
                });
                res.status(200).json(projects);
            })
            .catch(() => {
                res.status(500).json({ errorMessage: "Unable to access database" });
            });
        })
    } catch(err){
        next(err)
    }
});

// POST new project task
router.post('/:id/tasks', async (req, res) => {
  try{
    const task = req.body;
        task.project_id = req.params.id;
        db.addTask(task)
            .then(() => {
            db.getTasks(req.params.id)
                .then(tasks => {
                tasks.map(task => {
                    task.task_completed = task.task_completed === true;
                });
                res.status(200).json(tasks);
                })
                .catch(() => {
                res.status(500).json({ errorMessage: "Unable to locate project" });
                });
            })
    }  catch(err){
        next(err)
    }
});

// POST new resource
router.post('/resources', async (req, res) => {
  try{ 
    const resource = req.body;
    db.addResource(resource)
        .then(() => {
        db.getAllResources()
            .then(resources => {
            res.status(200).json(resources);
            })
            .catch(() => {
            res.status(500).json({ errorMessage: "Unable to access database" });
            });
        }) } catch(err){
            next(err)
        }
});

//                                STRETCH
//                           ---DELETE Requests---


// delete project
router.delete('/:id', (req, res) => {
    const { id } = req.params;
  
    db.removeProject(id)
    .then(deleted => {
      if (deleted) {
        res.json({ removed: deleted });
      } else {
        res.status(404).json({ message: 'Could not find project with given id' });
      }
    })
    .catch(err => {
      res.status(500).json({ message: 'Failed to delete project' });
    });
  });
  
//   Delete Task
  router.delete('/:id/tasks/:id', (req, res) => {
    const { id } = req.params;
  
    db.removeTask(id)
    .then(deleted => {
      if (deleted) {
        res.json({ removed: deleted });
      } else {
        res.status(404).json({ message: 'Could not find task with given id' });
      }
    })
    .catch(err => {
      res.status(500).json({ message: 'Failed to delete task' });
    });
  });

//   Delete Resource
  router.delete('/resources/:id', (req, res) => {
    const { id } = req.params;
  
    db.removeResource(id)
    .then(deleted => {
      if (deleted) {
        res.json({ removed: deleted });
      } else {
        res.status(404).json({ message: 'Could not find resource with given id' });
      }
    })
    .catch(err => {
      res.status(500).json({ message: 'Failed to delete resource' });
    });
  });
  

//                          ---PUT Requests--

// UPDATE Project
router.put('/:id', (req, res) => {
    const { id } = req.params;
    const changes = req.body;
  
    db.findByProjectId(id)
    .then(project => {
      if (project) {
        db.updateProject(changes, id)
        .then(updatedProject => {
          res.json(updatedProject);
        });
      } else {
        res.status(404).json({
             message: 'Could not find project with given id' });
      }
    })
    .catch (err => {
        console.log(err)
      res.status(500).json({
           message: 'Failed to update project' });
    });
  });

// UPDATE Resource
  router.put('/resources/:id', (req, res) => {
    const { id } = req.params;
    const changes = req.body;
  
    db.findByResourceId(id)
    .then(resource => {
      if (resource) {
        db.updateResource(changes, id)
        .then(updatedResource => {
          res.json(updatedResource);
        });
      } else {
        res.status(404).json({
             message: 'Could not find resource with given id' });
      }
    })
    .catch (err => {
        console.log(err)
      res.status(500).json({
           message: 'Failed to update resource' });
    });
  });

// UPDATE Task
  router.put('/:id/tasks/:id', (req, res) => {
    const { id } = req.params;
    const changes = req.body;
  
    db.findByTaskId(id)
    .then(task => {
      if (task) {
        db.updateTasks(changes, id)
        .then(updatedTask => {
          res.json(updatedTask);
        });
      } else {
        res.status(404).json({
             message: 'Could not find task with given id' });
      }
    })
    .catch (err => {
        console.log(err)
      res.status(500).json({
           message: 'Failed to update task' });
    });
  });

  


// GET project by id
router.get('/:id', (req, res) => {
    const { id } = req.params;
  
    db.findByProjectId(id)
    .then(project => {
      if (project) {
       next()
      } else {
        res.status(404).json({ message: 'Could not find project with given id.' })
      }
    })
    db.getTasks(req.params.id)
    .then(tasks => {
        tasks.map(task => {
        task.task_completed = task.task_completed === true;
        });
    res.status(200).json(tasks);
    
  })
  db.getResourceByTaskId(req.params.id)
    .then(resource => {
        if(resource){
            next()
        } else{
            res.status(404).json({
                message:'Could not find a resource with given id'
            })
        }
    res.status(200).json(resource);
  })
    
    .catch(err => {
      res.status(500).json({ message: 'Failed to get projects' });
    });
  });
  


module.exports = router; 