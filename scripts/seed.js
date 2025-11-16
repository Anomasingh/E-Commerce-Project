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

const seedProducts = [
  {
    name: "Premium Wireless Headphones",
    category: "Electronics",
    price: 79.99,
    originalPrice: 129.99,
    stock: 50,
    rating: 4.5,
    reviews: 234,
    image: "/wireless-headphones.jpg",
    description: "High-quality wireless headphones with active noise cancellation, 30-hour battery life, and premium sound.",
    vendorId: "vendor_001",
  },
  {
    name: "Smart Fitness Watch",
    category: "Electronics",
    price: 199.99,
    originalPrice: 299.99,
    stock: 30,
    rating: 4.3,
    reviews: 156,
    image: "/modern-smartwatch.png",
    description: "Advanced fitness tracking with heart rate monitor, GPS, and 7-day battery.",
    vendorId: "vendor_001",
  },
  {
    name: "Professional Running Shoes",
    category: "Fashion",
    price: 89.99,
    originalPrice: 139.99,
    stock: 100,
    rating: 4.6,
    reviews: 412,
    image: "/running-shoes.jpg",
    description: "Lightweight and comfortable athletic shoes designed for marathon and distance running.",
    vendorId: "vendor_002",
  },
  {
    name: "Automatic Coffee Maker",
    category: "Home & Living",
    price: 49.99,
    originalPrice: 79.99,
    stock: 25,
    rating: 4.4,
    reviews: 189,
    image: "/coffee-maker.jpg",
    description: "Programmable coffee maker with thermal carafe and brew strength control.",
    vendorId: "vendor_003",
  },
  {
    name: "Fast USB-C Charging Cable",
    category: "Electronics",
    price: 12.99,
    originalPrice: 19.99,
    stock: 500,
    rating: 4.2,
    reviews: 567,
    image: "/usb-cable.jpg",
    description: "2-meter durable USB-C cable with fast charging support up to 100W.",
    vendorId: "vendor_001",
  },
];

const seedOffers = [
  {
    code: "SAVE20",
    discount: 20,
    type: "percentage",
    description: "Save 20% on your purchase",
    maxUses: 100,
    expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
  },
  {
    code: "FLAT50",
    discount: 50,
    type: "fixed",
    description: "Get $50 off on orders over $200",
    maxUses: 50,
    expiresAt: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000),
  },
  {
    code: "SUMMER30",
    discount: 30,
    type: "percentage",
    description: "Summer special - 30% off selected items",
    maxUses: 75,
    expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
  },
];

const sampleUsers = [
  {
    email: "admin@example.com",
    password: "admin123",
    name: "Admin User",
    role: "admin",
  },
  {
    email: "vendor@example.com",
    password: "vendor123",
    name: "Vendor User",
    role: "vendor",
  },
  {
    email: "customer@example.com",
    password: "customer123",
    name: "Customer User",
    role: "customer",
  },
];

async function run() {
  console.log('Using MongoDB URI:', uri.startsWith('mongodb') ? uri.replace(/(mongodb.*:\/\/[^:]+:)([^@]+)(@.*)/, '$1<redacted>$3') : uri);
  const client = new MongoClient(uri);
  try {
    await client.connect();
    const db = client.db('ecommerce');

    console.log('Clearing existing collections (products, offers, users)');
    await Promise.all([
      db.collection('products').deleteMany({}),
      db.collection('offers').deleteMany({}),
      db.collection('users').deleteMany({}),
    ]);

    const pRes = await db.collection('products').insertMany(seedProducts);
    console.log(`Inserted ${pRes.insertedCount} products`);

    const oRes = await db.collection('offers').insertMany(seedOffers);
    console.log(`Inserted ${oRes.insertedCount} offers`);

    const uRes = await db.collection('users').insertMany(sampleUsers);
    console.log(`Inserted ${uRes.insertedCount} users`);

    console.log('Seeding complete.');
  } catch (err) {
    console.error('Seeding error:', err);
  } finally {
    await client.close();
  }
}

run();
