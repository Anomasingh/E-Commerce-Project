const fs = require('fs');
const path = require('path');
const { MongoClient } = require('mongodb');

function loadEnvLocal() {
  try {
    const envPath = path.join(__dirname, '..', '.env.local');
    const content = fs.readFileSync(envPath, 'utf8');
    const match = content.match(/MONGODB_URI=(.*)/);
    if (match) return match[1].trim();
  } catch (e) {}
  return null;
}

const uri = process.env.MONGODB_URI || loadEnvLocal() || 'mongodb://localhost:27017/ecommerce';

async function run() {
  const client = new MongoClient(uri);
  try {
    await client.connect();
    const db = client.db('ecommerce');
    const products = await db.collection('products').find().toArray();
    console.log('Products count:', products.length);
    if (products.length) console.log('First product:', products[0]);
  } catch (err) {
    console.error('DB check error:', err.message);
  } finally {
    await client.close();
  }
}

run();
