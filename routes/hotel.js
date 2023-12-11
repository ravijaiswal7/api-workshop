const express = require('express');
const router = express.Router();
const Hotel = require('../models/hotel')
const jwt = require('jsonwebtoken');

// middleware
const jwtVerify = (req, res, next) => {
    const token = req.headers.authorization;
    if(token) {
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decodedToken;
    }
    next();
}

// tell express to use jwtVerify middlewware
router.use(jwtVerify);

// Get all hotels
router.get("/", async (req, res) => {
    const hotelsDb = await Hotel.find();
    res.send(hotelsDb);
})

// Get one hotels
router.get("/:id", async(req, res) => {
    const hotel = await Hotel.findById(req.params.id);
    res.send(hotel);
})

// Create one hotel
router.post("/", async (req, res) => {
    if(req.user && req.user.role === "ADMIN") {
        const hotel = req.body;
        const createdHotel = await Hotel.create(hotel);
        res.send(createdHotel);
    } else {
        res.status(403).send({ message: "Unauthorized" });
    }
})

// Delete one hotel
router.delete("/:id", async (req, res) => {
    if (req.user && req.user.role === "ADMIN") {
        const response = await Hotel.deleteOne({ _id: req.params.id });
        res.send(response);
    } else {
        res.status(403).send({ message: "Unauthorized" });
    }
})

// Update hotel
router.put("/:id", async (req, res) => {
    if (req.user && req.user.role === "ADMIN") {
        const newHotel = req.body;
        const response = await Hotel.findOneAndUpdate({ _id: req.params.id }, newHotel);
        res.send(response);
    } else {
        res.status(403).send({ message: "Unauthorized" });
    }
})

module.exports = router;