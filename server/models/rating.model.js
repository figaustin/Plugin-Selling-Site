const mongoose = require('mongoose')

const RatingSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    plugin: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'MinecraftPlugin'
    },
    amount: {
        type: Number,
        min: [1, "Rating must be from 1-5"],
        max: [5, "Rating must be from 1-5"]
    },
    review: {
        type: String,
        minLength: [10, "Review must be at least 10 characters long!"]
    }

});

module.exports = mongoose.model('Rating', RatingSchema)