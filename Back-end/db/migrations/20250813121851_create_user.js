/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
    return knex.schema.createTable('users', function(table) {
        table.increments('id').primary(); // PRIMARY KEY AUTOINCREMENT
        table.text('name').notNullable();
        table.text('email').notNullable().unique();
        table.text('password').notNullable();
        table.datetime('created_at').defaultTo(knex.fn.now());

        // Índice único para email
        table.unique(['email'], 'unique_email');
    });
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function down(knex) {
    return knex.schema.dropTableIfExists('users');
}
