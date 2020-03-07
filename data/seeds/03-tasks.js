
exports.seed = function(knex) {
  return knex('tasks').insert([
    {
      id: 1, 
      task_desc: 'Interview Prep',
      task_notes: 'Mock interview with friends or Bigfoot',
      task_completed: false,
      project_id: 2
    },
    {
      id: 2, 
      task_desc: 'Rip Hair out',
      task_notes: 'By the end of this I will want to anyway',
      task_completed: false,
      project_id: 1
    },
    {
      id: 3, 
      task_desc: 'Update resume',
      task_notes: 'I have a few mediocre things to add from the last year',
      task_completed: false,
      project_id: 2
    },
    {
      id: 4, 
      task_desc: 'Get Greg to take his mothers minivan and the camera',
      task_notes: 'Make sure it is the Bigfoot camera',
      task_completed: true,
      project_id: 3
    },
    {
      id: 5, 
      task_desc: 'Track Bigfoot',
      task_notes: 'Harder than we anticipated',
      task_completed: false,
      project_id: 3
    },
    {
      id: 6, 
      task_desc: 'Feed the cats',
      task_notes: 'Make sure they have their special diet food',
      task_completed: true,
      project_id: 4
    },
    {
      id: 7, 
      task_desc: 'Cook all the food',
      task_notes: 'Dont forget the seasoning',
      task_completed: true,
      project_id: 5
    }
  ]);
};