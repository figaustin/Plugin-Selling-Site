const MinecraftPlugin = require('../models/plugin.model')

module.exports.findPluginById = (req, res) => {
    MinecraftPlugin.findOne({_id: req.params.id})
        .then(minecraftPlugin => {res.json({minecraftPlugin: minecraftPlugin})})
        .catch(err => res.json({message: "Something went wrong!", error: err}))
};


