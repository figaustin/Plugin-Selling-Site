const Tag = require('../models/tag.model');
const jwt = require('jsonwebtoken')

module.exports.findTagById = (req, res) => {
    Tag.findOne({_id: req.params.id})
        .then(tag => {res.json({tag: tag})})
        .catch(error => {res.json({message: "Something went wrong!", error: error})})
}

module.exports.createNewTag = (req, res) => {
    const decodedJWT = jwt.decode(req.cookies.usertoken, {complete: true});

    if(req.cookies.usertoken != null) {
        if(decodedJWT.payload.admin) {
            Tag.create(req.body)
                .then(tag => {res.json({tag: tag})})
                .catch(error => {res.json({message: "Something went wrong!", error: error})})
        } else {
            res.json({message: "You must be an admin to create tags!"})
        }
    } else {
        res.json({message: "You must be logged in to do that!"})
    }
}

module.exports.updateTag = (req, res) => {
    const decodedJWT = jwt.decode(req.cookies.usertoken, {complete: true});

    if(req.cookies.usertoken != null) {
        if(decodedJWT.payload.admin) {
            Tag.findByIdAndUpdate({_id: req.params.id}, req.body, {new: true})
                .then(tag => {res.json({tag: tag})})
                .catch(error => {res.json({message: "Something went wrong!", error: error})})
        } else {
            res.json({message: "You must be an admin to edit tags!"})
        }
    } else {
        res.json({message: "You must be logged in to do that!"})
    }
}

module.exports.deleteTag = (req, res) => {
    const decodedJWT = jwt.decode(req.cookies.usertoken, {complete: true});

    if(req.cookies.usertoken != null) {
        if(decodedJWT.payload.admin) {
            Tag.findByIdAndDelete({_id: req.params.id})
                .then(tag => {res.json({tag: tag})})
                .catch(error => {res.json({message: "Something went wrong!", error: error})})
        } else {
            res.json({message: "You must be an admin to delete tags!"})
        }
    } else {
        res.json({message: "You must be logged in to do that!"})
    }
}