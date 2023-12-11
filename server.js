// To render content of .env file into process.env
require("dotenv").config();

const express = require("express");
const mongoose = require('mongoose');
const hotelRouter = require('./routes/hotel');
const userRouter = require('./routes/user');

// Establish db connection
mongoose.connect(process.env.MONGO_URL).then(() => {
    console.log("Connected to MongoDB")
})

const app = express();
const PORT = process.env.PORT;

// Middleware
const logger = (req, res, next) => {
    console.log(`${req.method} received on ${req.url}`);
    // To resume next level of execution or else it will be stuck here
    next();
}

// Tell express to use the middleware
app.use(logger);
// To parse the response in every call
app.use(express.json())
app.use('/api/hotels/', hotelRouter);
app.use('/api/users/', userRouter);


app.get("/", (req, res) => {
    res.send("Hello World!")
})

app.listen(PORT, () => {
    console.log(`Server is up and running on ${PORT}`)
})