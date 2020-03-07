exports.up = function(knex) {
    return knex.schema
      .createTable("projects", table => {
        table.increments();
        table.string("project_name", 128)
        .notNull();
        table.text("project_desc");
        table.boolean("project_completed")
        .defaultTo(false)
      })
      .createTable("resources", table => {
        table.increments();
        table.string("resource_name", 128)
        .notNull()
        .unique();
        table.text("resource_desc");
      })
      .createTable("tasks", table => {
        table.increments();
        table.string("task_desc", 128)
        .notNull()
        table.text("task_notes")
        table.boolean("task_completed")
        .defaultTo(false)
        table
          .integer("project_id")
          .notNull()
          .references("id")
          .inTable("projects")
          .onDelete("CASCADE")
          .onUpdate("CASCADE");
      })
      .createTable("prj-resources", table => {
        table
        .integer("project_id")
        .notNull()
        .references("id")
        .inTable("projects")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
        table
        .integer("resource_id")
        .notNull()
        .references("id")
        .inTable("resources")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
        table.primary(['project_id', 'resource_id'])
      } )
  };
  
  exports.down = function(knex) {
    return (
      knex.schema
        .dropTableIfExists("prj-resources")
        .dropTableIfExists("tasks")
        .dropTableIfExists("resources")
        .dropTableIfExists("projects")
    )
  };