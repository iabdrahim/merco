import mongoose from "mongoose";

let MONGO_URI = process.env.MONGO_URI;

// let cachedDB: unknown = null;
export default async function connect() {
  console.log("Connecting...");
  // if (cachedDB) {
  //   console.log("Conected to Database !");
  //   return cachedDB;
  // }
  if (mongoose.connections[0].readyState) {
    console.log("Conected to Database !");
    return mongoose.connections[0];
  }
  if (!MONGO_URI) {
    throw new Error("Check the mongodb uri");
  }
  let connection;
  try {
    connection = await mongoose.connect(MONGO_URI);
    console.log("Conected to Database !");
  } catch {
    (err: any) => {
      console.log("Failed to conecte to  Database");
      console.error(err);
      process.exit(1);
    };
  }
  return connection;
}
