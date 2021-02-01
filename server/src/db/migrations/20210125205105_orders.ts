import * as Knex from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('orders', (table: Knex.CreateTableBuilder) => {
    table.increments('id');
    table.integer('user_id').references('users.id');
    table.specificType('products', 'text[]').references('products.id');
    table.float('value');
    table.timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists('orders');
}
