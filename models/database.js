const { Client } = require('pg');
require('dotenv').load();

const connectionString = process.env.DATABASE_URL || 'postgresql://postgres:S4rum0k1@localhost:5432/recipe-book';
const client = new Client({
  connectionString: connectionString
});

client.connect();
const createTables = async function (){
  await client.query("CREATE TABLE users (userid uuid primary key DEFAULT uuid_generate_v4(), username varchar(128), firebaseuserid varchar(38))");
  console.log('users table created');
  await client.query("CREATE TABLE recipes (recipeId uuid primary key DEFAULT uuid_generate_v4(), recipeName varchar(128), userId uuid references users(userId) on delete cascade, ingredients jsonb, instructions text);");
  console.log('recipes table created');
}

createTables()
.then(client.end)
.catch(function(err) {
  console.log(err);
  client.end();
});




