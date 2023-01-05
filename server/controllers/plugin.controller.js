const MinecraftPlugin = require('../models/plugin.model')
const User = require('../models/user.model');
const jwt = require('jsonwebtoken');


module.exports.findPluginById = (req, res) => {
    MinecraftPlugin.findOne({_id: req.params.id})
        .then(minecraftPlugin => {res.json({minecraftPlugin: minecraftPlugin})})
        .catch(err => res.json({message: "Something went wrong!", error: err}))
};

module.exports.addNewPlugin = (req, res) => {
    const decodedJWT = jwt.decode(req.cookies.usertoken, {complete: true});

    if(req.cookies.usertoken != null) {
        const newPlugin = {
            author: decodedJWT.payload.id,
            name: req.body.name,
            description: req.body.description,
            versions: req.body.versions,
            tags: req.body.tags,
            price: req.body.price,
            file: req.body.file,
            ratings: req.body.ratings
        }

        MinecraftPlugin.create(newPlugin)
        .then(newPlugin => {res.json({newPlugin: newPlugin})})
        .catch(error => {res.json({message: "Something went wrong!", error: error})})
    } else {
        res.json({message: "User must be logged into create a plugin!"})
    }
};

module.exports.updatePlugin = (req,res) => {
    const decodedJWT = jwt.decode(req.cookies.usertoken, {complete: true});

    MinecraftPlugin.findOne({_id: req.params.id})
        .then(minecraftPlugin => {
            if(minecraftPlugin.author == decodedJWT.payload.id || decodedJWT.payload.admin) {
                MinecraftPlugin.findByIdAndUpdate({_id: req.params.id}, req.body, {new: true})
                .then(result => res.json({updatedPlugin: result}))
                .catch(error => res.json({message: "Something went wrong!", error: error}))
            } else {
                res.json({message: "User is not an admin or the owner of this plugin!"})
            }
        })
        .catch(error => {res.json({message: "Something went wrong!", error: error})})
};

module.exports.deletePlugin = (req, res) => {
    const decodedJWT = jwt.decode(req.cookies.usertoken, {complete: true});

    MinecraftPlugin.findOne({_id: req.params.id})
        .then(minecraftPlugin => {
            if(minecraftPlugin.author == decodedJWT.payload.id || decodedJWT.payload.admin) {
                MinecraftPlugin.findOneAndDelete({_id: req.params.id})
                .then(result => {res.json({result: result})})
                .catch(error => res.json({message: "Something went wrong!", error: error}))
            } else {
                res.json({message: "User is not an admin or the owner of this plugin!"})
            }
        })
        .catch(error => {res.json({message: "Something went wrong!", error: error})})
};

module.exports.getAllPlugins = (req, res) => {
    MinecraftPlugin.find()
        .then(results => {res.json({results: results})})
        .catch(error => {res.json({message: "Something went wrong!", error: error})})
};
