const Rating = require('../models/rating.model')
const MinecraftPlugin = require('../models/plugin.model')
const User = require('../models/user.model');
const jwt = require('jsonwebtoken');

module.exports.findRatingById = (req, res) => {
    Rating.findOne({_id: req.params.id})
        .then(rating => {res.json({rating: rating})})
        .catch(error =>  {res.json({message: "Something went wrong!", error: error})})
};

module.exports.createNewRating = (req, res) => {
    const decodedJWT = jwt.decode(req.cookies.usertoken, {complete: true});

    if(req.cookies.usertoken != null) {
        User.findOne({_id: decodedJWT.payload.id})
            .then(user => {
                if(user.purchasedPlugins.includes(req.params.pluginId)) {
                    const newRating = {
                        user_id: decodedJWT.payload.id,
                        plugin_id: req.params.pluginId,
                        amount: req.body.amount,
                        review: req.body.review,
                    }

                    Rating.create(newRating)
                        .then(rating => {res.json({rating: rating})})
                        .catch(error => {res.json({message: "Something went wrong!", error: error})})
                } else{
                    res.json({message: "You do not own this plugin!"})
                }
            })
            .catch(error => {res.json({message: "Something went wrong!", error: error})})
    }
};

module.exports.updateRating = (req, res) => {
    Rating.findByIdAndUpdate({_id: req.params.id}, req.body, {new: true})
        .then(result => {res.json({updatedRating: result})})
        .catch(error => {res.json({message: "Something went wrong!", error: error})})
};

module.exports.deleteRating = (req, res) => {
    Rating.findOneAndDelete({_id: req.params.id})
        .then(result => {res.json({result: result})})
        .catch(error => {res.json({message: "Something went wrong!", error: error})})
};

