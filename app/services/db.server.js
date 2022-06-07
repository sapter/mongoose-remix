import mongoose from "mongoose";

let db;

// connect()

async function connect() {
  if (db) return db;
  mongoose.connection.on('connected', () => console.log({mongoDB: 'Connected'}))
  mongoose.connection.on('error', () => console.log({mongoDB: 'Error'}))

  if (process.env.NODE_ENV === "production") {
    db = await mongoose.connect(process.env.MONGODB_URL)
  } else {
    // in development, need to store the db connection in a global variable
    // this is because the dev server purges the require cache on every request
    // and will cause multiple connections to be made
    if (!global.__db) {
      global.__db = await mongoose.connect(process.env.MONGODB_URL)
    }
    db = global.__db;
  }
  return db;
}

export { connect };
