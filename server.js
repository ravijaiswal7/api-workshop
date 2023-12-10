require("dotenv").config()
const express = require("express");
const hotelRouter = require('./routes/hotel');

const app = express();

const PORT = process.env.port;

console.log(PORT);

// Middleware
const logger = (req, res, next) => {
    console.log(`${req.method} received on ${req.url}`);
    next();
}

// Tell express to use the middleware
app.use(logger);
// To parse the response in every call
app.use(express.json())

console.log(hotelRouter);
app.use('/api/hotels/', hotelRouter);

app.get("/", (req, res) => {
    res.send("Hello World!")
})

app.listen(PORT, () => {
    console.log(`Server has started in port number ${PORT}`)
})