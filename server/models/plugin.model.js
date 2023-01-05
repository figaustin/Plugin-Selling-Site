const mongoose = require('mongoose');
const Rating = require('../models/rating.model')

const MinecraftPluginSchema = new mongoose.Schema({
    author : {
        type: mongoose.Schema.Types.ObjectId,
        ref : "User",
    },

    name: {
        type: String,
        required: [true, "Plugin name is required!"],
        minLength: [2, "Plugin name must be at least 2 characters long!"],
        maxLength: [24, "Plugin name must be less than 24 characters or less!"]
    },
    description: {
        type: String,
        required: [true, "Plugin description required!"],
        minLength: [10, "Plugin description must be at least 10 characters long!"],
        maxLength: [250, "Plugin description can not be more than 250 characters!"]
    },
    versions: {
        type: [String],
        enum: ['1.19', '1.18', '1.17', '1.16', '1.15', '1.14', '1.13', '1.12', '1.11', '1.10', '1.9', '1.8'],
        require: [true, "Please enter valid minecraft versions this plugin works with!"],
       
    },
    tags: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Tag'
    },
    price: {
        type: Number,
        min: [1, "Price must be at least $1"]
    },
    file: {
        type: String
    },
    ratings: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Rating'
    }

})

module.exports = mongoose.model('MinecraftPlugin', MinecraftPluginSchema);