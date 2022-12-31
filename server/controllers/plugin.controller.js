const MinecraftPlugin = require('../models/plugin.model')

module.exports.findPluginById = (req, res) => {
    MinecraftPlugin.findOne({_id: req.params.id})
        .then(minecraftPlugin => {res.json({minecraftPlugin: minecraftPlugin})})
        .catch(err => res.json({message: "Something went wrong!", error: err}))
};

module.exports.addNewPlugin = (req, res) => {
    MinecraftPlugin.create(req.body)
        .then(newPlugin => {res.json({newPlugin: newPlugin})})
        .catch(error => {res.json({message: "Something went wrong!", error: error})})
};

module.exports.updatePlugin = (req,res) => {
    MinecraftPlugin.findByIdAndUpdate({_id: req.params.id}, req.body, {new: true})
        .then(result => res.json({updatedPlugin: result}))
        .catch(error => res.json({message: "Something went wrong!", error: error}))
};

module.exports.deletePlugin = (req, res) => {
    MinecraftPlugin.findOneAndDelete({_id: req.params.id})
        .then(result => res.json({result: result}))
        .catch(error => res.json({message: "Something went wrong!", error: error}))
};

module.exports.getAllPlugins = (req, res) => {
    MinecraftPlugin.find()
        .then(results => {res.json({results: results})})
        .catch(error => {res.json({message: "Something went wrong!", error: error})})
};


