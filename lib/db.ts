import { MongoClient, Db } from "mongodb";

let cachedClient: MongoClient | null = null;
let cachedDb: Db | null = null;

const uri = process.env.MONGODB_URI || "mongodb://localhost:27017/ecommerce";

export async function connectToDatabase() {
  if (cachedClient && cachedDb) {
    return { client: cachedClient, db: cachedDb };
  }

  const client = new MongoClient(uri);
  await client.connect();
  const db = client.db("ecommerce");

  cachedClient = client;
  cachedDb = db;

  return { client, db };
}

export async function getDatabase() {
  const { db } = await connectToDatabase();
  return db;
}
