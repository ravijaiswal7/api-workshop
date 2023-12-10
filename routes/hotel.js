const express = require('express');
const router = express.Router();

const hotels = [
    {
        id: 1,
        name: 'hotel 1',
        price: 100,
        city: 'Paris',
        country: 'France',
        rating: 4.2,
        stars: 4
    },
    {
        id: 2,
        name: 'hotel 2',
        price: 150,
        city: 'London',
        country: 'UK',
        rating: 4.5,
        stars: 5
    }
]

// Get all hotels
router.get("/", (req, res) => {
    // logger();
    res.send(hotels);
})

// Get one hotels
router.get("/:id", (req, res) => {
    // logger();
    const hotel = hotels.find(hotel => hotel.id === parseInt(req.params.id, 10))
    res.send(hotel);
})

// Create one hotel
router.post("/", (req, res) => {
    // logger();
    const hotel = req.body;
    console.log({hotel});
    hotels.push(hotel);
    res.send(hotel);
})

// Delete one hotel
router.delete("/:id", (req, res) => {
    // logger();
    const hotelIdxToDelete = hotels.findIndex(hotel => hotel.id === parseInt(req.params.id, 10));
    console.log('Request received to delete a hotel - ');
    console.log(hotels[hotelIdxToDelete]);
    hotels.splice(hotelIdxToDelete, 1);
    res.send(hotels);
})

// Update hotel
router.put("/:id", (req, res) => {
    // logger();
    const newHotel = req.body;
    const updatedHotels = hotels.map((hotel) => {
        if(hotel.id === parseInt(req.params.id, 10)) {
           return {
              ...hotel, 
              ...newHotel
            }
        } else {
            return hotel;
        }
    })
    res.send(updatedHotels);
})

module.exports = router;