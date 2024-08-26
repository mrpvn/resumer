import mongoose from "mongoose";

const MONGODB_URL = process.env.MONGODB_CONNECTION_URL as string

type Connection = {
  isConnected?: number
}

const connection: Connection = {}

async function connectToDatabase():Promise<void>{
  if(connection.isConnected){
    console.log("Already Connected to database");
    return;
  }

  try {
    const db = await mongoose.connect(MONGODB_URL);
    connection.isConnected = db.connections[0].readyState
    console.log("DB connected sucessfully");
  } catch (error) {
    console.log("Databse connection failed : ", error)
    process.exit(1);
  }
}

export default connectToDatabase; 