// lib/mongodb.js

import { MongoClient } from "mongodb";

let uri = process.env.MONGODB_URI;
let dbName = process.env.MONGODB_DB;
let cachedClient = null;
let cachedDb = null;
let options = {
  // useNewUrlParser: true,
  // useUnifiedTopology: true,
};

if (!uri) {
  throw new Error(
    "Please define the MONGODB_URI environment variable inside .env.local"
  );
}

if (!dbName) {
  throw new Error(
    "Please define the MONGODB_DB environment variable inside .env.local"
  );
}

export async function connectToDatabase() {
  if (cachedClient && cachedDb) {
    return { client: cachedClient, db: cachedDb };
  }

  let client;
  let db;

  if (process.env.NODE_ENV === "development") {
    // in dev mode, use a global var to preserve client across module reloads
    client = await MongoClient.connect(uri, options);
    db = await client.db(dbName);
    cachedClient = client;
    cachedDb = db;
  } else {
    // in prod mode, do not use a global var
    client = await MongoClient(uri, options);
    db = await client.db(dbName);
  }

  return { client, db };
}
