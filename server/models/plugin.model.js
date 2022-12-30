const mongoose = require('mongoose');
const Rating = require('./rating.model')

const MinecraftPluginSchema = new mongoose.Schema({
    user_id : {
        type: mongoose.Schema.Types.ObjectId,
        ref : "User"
    },

    name: {type: String},
    description: {
        type: String,
    },
    versions: {
        type: [Number],
    },
    tags: {
        type: [String],
    },
    price: {
        type: Number
    },
    file: {
        type: String
    },
    ratings: {
        type: [Rating.RatingSchema]
    }

})

module.exports = mongoose.model('MinecraftPlugin', MinecraftPluginSchema);