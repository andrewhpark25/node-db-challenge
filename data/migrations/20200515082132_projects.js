
exports.up = function(knex) {
    return knex.schema
    .createTable('projects', tbl => {
        tbl.increments();
        tbl.string('name', 128).notNullable();
        tbl.string('description');
        tbl.boolean('completed').defaultTo(0);
    
    })
    .createTable('tasks', tbl => {
        tbl.increments();
        tbl.string('task_description').notNullable();
        tbl.string('notes');
        tbl.boolean('task_completed').defaultTo(0);

        tbl.integer("project_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("projects")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");


    })
    .createTable('resources', tbl => {
      
        
        tbl.increments();
        tbl.string('resource_name').notNullable();
        tbl.string('resource_description');
 

       
        tbl.integer("project_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("projects")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");

    })
  };
  
  exports.down = function(knex) {
      return knex.schema
      .dropTableIfExists("resources")
      .dropTableIfExists("tasks")
      .dropTableIfExists("projects")
  };