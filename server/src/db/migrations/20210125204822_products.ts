import * as Knex from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable(
    'products',
    (table: Knex.CreateTableBuilder) => {
      table.increments('id');
      table.string('title', 50);
      table.float('rating');
      table.string('brand');
      table.string('gender');
      table.float('price');
      table.string('description');
      table.integer('stock');
      table.integer('reviewNum');
      table.specificType('colors', 'text[]');
      table.specificType('tags', 'text[]');
      table.timestamps(true, true);
    }
  );
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists('products');
}
