import mongoose from "mongoose";

const { MONGO_USER, MONGO_PASS, MONGO_HOST, MONGO_DB } = process.env;

if (!MONGO_USER || !MONGO_PASS || !MONGO_HOST || !MONGO_DB) {
  throw new Error("Please define all required Mongo env variables");
}

const MONGODB_URI = `mongodb://${MONGO_USER}:${MONGO_PASS}@${MONGO_HOST}:27017/${MONGO_DB}`;
let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function dbConnect() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI).then((mongoose) => {
      return mongoose;
    });
  }
  cached.conn = await cached.promise;
  return cached.conn;
}

export default dbConnect;
