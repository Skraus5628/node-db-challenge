exports.seed = function(knex) {
  return knex('resources').insert([
    {
      id: 1, 
      resource_name: 'Bigfoot Camera',
      resource_desc: 'A really good not blurry at all camera'
    },
    {
      id: 2, 
      resource_name: 'Lambda',
      resource_desc: 'The super great school where I learn things',
    },
    {
      id: 3, 
      resource_name: 'Google',
      resource_desc: 'The super great lifesaving tool that connects me to stack overflow...'
    },
    {
      id: 4, 
      resource_name: 'Food Containers',
      resource_desc: 'Just a little bigger than they should be'
    },
    {
      id: 5, 
      resource_name: 'Greg',
      resource_desc: 'Someone who knows Bigfoot is real and can use google'
    },
  ]);
};