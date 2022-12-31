const Rating = require('../models/rating.model')

module.exports.findRatingById = (req, res) => {
    Rating.findOne({_id: req.params.id})
        .then(rating => {res.json({rating: rating})})
        .catch(error =>  {res.json({message: "Something went wrong!", error: error})})
};

module.exports.createNewRating = (req, res) => {
    Rating.create(req.body)
        .then(newRating => {res.json({newRating: newRating})})
        .catch(error => {res.json({message: "Something went wrong!", error: error})})
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

