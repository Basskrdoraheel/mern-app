const mongoose = require('mongoose')
require ('dotenv').config()

const uri ="mongodb+srv://mughal123:mughal123@cluster0.bocepvr.mongodb.net/mern-app?retryWrites=true&w=majority"
const connectDB = async () => {
  try {
    // console.log("MONGO_URI : "+ uri)
    const conn = await mongoose.connect(uri)

    console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline)
  } catch (error) {
    console.log(error)
    process.exit(1)
  }
}

module.exports = connectDB;