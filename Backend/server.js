const express = require("express");
const router = require("./routes/goalRoutes");
const dotenv = require("dotenv").config()
const {errorHandler} = require("./Midlewares/errorMidleware")
const colors = require('colors')
const connectDB = require('./config/db');


connectDB();
const app = express();
const port = process.env.PORT || 5000;

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use("/api/goals",require("./routes/goalRoutes"))
app.use("/api/user",require("./routes/userRoutes"))
app.use(errorHandler)

app.listen(port,()=>{
    console.log(`Server is running on ${port}`);
})