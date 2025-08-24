import mongoose from "mongoose";

export const dbConnection = mongoose.connect("mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+2.5.6").then(()=> {console.log("db is connected")}).catch((err) => {console.log(err)});