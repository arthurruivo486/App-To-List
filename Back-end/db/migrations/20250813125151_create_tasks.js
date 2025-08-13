/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
    return knex.schema.createTable('tasks', function(table) {
        table.increments('id').primary();
        table.integer('user_id').notNullable()
             .references('id').inTable('users')
             .onDelete('CASCADE'); // Apaga tarefas junto com o usuário

        table.text('title').notNullable();
        table.text('description');
        table.text('status').defaultTo('pending');
        table.date('due_date');
        table.datetime('created_at').defaultTo(knex.fn.now());
        table.datetime('updated_at').defaultTo(knex.fn.now());

        // Índice para buscar rápido pelas tarefas do usuário
        table.index(['user_id'], 'idx_user_id');
    });
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function down(knex) {
    return knex.schema.dropTableIfExists('tasks');
}
