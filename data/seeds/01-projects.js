
exports.seed = function(knex) {
  return knex('projects').insert([
    {
      id: 1, 
      project_name: 'Pass the sprint',
      project_desc: 'Node sprint challenge accepted',
      project_completed: false
    },
    {
      id: 2, 
      project_name: 'Find a better job',
      project_desc: 'Send a million resumes until someone calls back',
      project_completed: false
    },
    {
      id: 3, 
      project_name: 'Find Bigfoot',
      project_desc: 'Bigfoot is real and we need to use a better camera...',
      project_completed: false
    },
    {
      id: 4, 
      project_name: 'Take care of the cats',
      project_desc: 'Litter and laser pointers',
      project_completed: true
    },
    {
      id: 5, 
      project_name: 'Meal prep',
      project_desc: 'prep and portion the weeks meals',
      project_completed: true
    },
  ]);
};