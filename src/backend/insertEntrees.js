const fs = require('fs');
const { MongoClient } = require('mongodb');

const uri = 'mongodb+srv://trungly123:May042001@coms-319-database.bgoeykr.mongodb.net/';
const client = new MongoClient(uri);

async function seed() {
  try {
    await client.connect();
    const db = client.db('COMS-319-Data');
    const productsCollection = db.collection('products');

    const rawData = fs.readFileSync('./assets/data.json', 'utf8');
    const data = JSON.parse(rawData);

    if (Array.isArray(data.products)) {
      const result = await productsCollection.insertMany(data.products);
      console.log(`Inserted ${result.insertedCount} entrees.`);
    } else {
      console.error('No products array found in data.json');
    }
  } catch (err) {
    console.error(err);
  } finally {
    await client.close();
  }
}

seed();
