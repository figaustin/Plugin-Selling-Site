const mongoose = require('mongoose');


const RatingSchema = new mongoose.Schema({

    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    plugin_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "MinecraftPlugin",
    },

    amount: {
        type: Number,
        min: [1, "Rating must be from 1-5"],
        max: [5, "Rating must be from 1-5"]
    }
    },

);


module.exports = mongoose.model('Rating', RatingSchema);