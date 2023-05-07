const pgp = require('pg-promise')();
const faker = require('faker');

const db = pgp({
  user: 'postgres',
  host: 'localhost',
  database: 'inventoryDB',
  password: 'postgres',
  port: 5432, 
});


const generateDummyData = async (rowCount) => {
  try {
    for (let i = 0; i < rowCount; i++) {
      const name = faker.name.firstName();
      const place = faker.address.city();
      const price = faker.random.number({ min: 1, max: 1000 });

      await db.none('INSERT INTO items(name, place, price) VALUES($1, $2, $3)', [name, place, price]);
      console.log(`Row ${i + 1} inserted successfully`);
    }
  } catch (error) {
    console.error(`Error inserting row: ${error}`);
  } finally {
    pgp.end();
  }
};

const rowCount = 300000; 
generateDummyData(rowCount);
