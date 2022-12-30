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
    }
    },

);


module.exports = mongoose.model('Rating', RatingSchema);