const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    role: String,
});

/*
ADMIN - CREATE DELETE UPDATE HOTEL
USER - LIST HOTELS, LIST ONE SINGLE HOTEL
*/

const User = mongoose.model("User", userSchema);

module.exports = User;