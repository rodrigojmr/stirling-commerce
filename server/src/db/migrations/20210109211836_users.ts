import * as Knex from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('users', (table: Knex.CreateTableBuilder) => {
    table.increments('id');
    table.string('email', 36);
    table.string('password', 36);
    table.timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<void> {}
