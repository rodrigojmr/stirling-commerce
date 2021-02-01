import * as Knex from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('users', (table: Knex.CreateTableBuilder) => {
    table.increments('id');
    table.string('name', 25);
    table.string('email', 36);
    table.string('password', 36);
    table.timestamps(true, true);
    table.integer('orders_id').references('orders.id');
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists('users');
}
