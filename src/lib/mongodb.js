import mongoose from 'mongoose';

const uri = process.env.MONGODB_URI || '';
const dbName = process.env.MONGODB_DB_NAME || '';

export default async function connect() {
  let conn;
  if (!conn) {
    try {
      conn = await mongoose.connect(uri, {
        dbName,
        serverSelectionTimeoutMS: 5000,
        connectTimeoutMS: 2000,
      });
    } catch (error) {
      console.error(`Error to connect into database: ${error}`);
    }
  }
  return conn;
}