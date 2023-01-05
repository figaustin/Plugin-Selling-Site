const MinecraftPlugin = require('../models/plugin.model')
const User = require('../models/user.model');
const jwt = require('jsonwebtoken');
const uploadFile = require('../middleware/upload');
const Tag = require('../models/tag.model');


module.exports.findPluginById = (req, res) => {
    MinecraftPlugin.findOne({_id: req.params.id}).populate('ratings').populate('tags').populate('author')
        .then(minecraftPlugin => {res.json({minecraftPlugin: minecraftPlugin})})
        .catch(err => res.json({message: "Something went wrong!", error: err}))
};

module.exports.uploadPlugin = async (req, res) => {
    try { 
        await uploadFile(req, res);

        if(req.file == undefined) {
            return res.status(400).send({message: "Please upload a file!"});
        }
        
        MinecraftPlugin.findByIdAndUpdate({_id: req.params.id}, { file: req.file.originalname })
            .then(plugin => {res.json({plugin: plugin})})
          
        res.status(200).send({
            message: "Uploaded the file successfully: " + req.file.originalname, 
        });
        
    } catch (err) {
        res.status(500).send({
            message: `Could not upload the file: ${err}`,
        });
    }
};

module.exports.downloadPlugin = (req, res) => {

    MinecraftPlugin.findById({_id: req.params.id})
        .then(plugin => {
            const fileName = plugin.file;
            const directoryPath = __basedir + "/uploads/";

            res.download(directoryPath + fileName, fileName, (err) => {
                if(err) {
                    res.status(500).send({
                        message: "Could not download the file" + err,
                    });
                }
            });
        })
        .catch(error => {res.json({message: "Something went wrong!", error: error})})
    
}

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
        .then(newPlugin => {
            res.json({newPlugin: newPlugin})
            User.findByIdAndUpdate({_id: decodedJWT.payload.id}, { $push: {uploadedPlugins: newPlugin}})
                .then(user => {})
                
        })
        .catch(error => {res.json({message: "Something went wrong!", error: error})})
    } else {
        res.json({message: "User must be logged into create a plugin!"})
    }
};

module.exports.updatePlugin = (req,res) => {
    const decodedJWT = jwt.decode(req.cookies.usertoken, {complete: true});

    if(req.cookies.usertoken != null) {
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

    } else {
        res.json({message: "You must be logged in to do that!"})
    }
};

module.exports.deletePlugin = (req, res) => {
    const decodedJWT = jwt.decode(req.cookies.usertoken, {complete: true});

    if(req.cookies.usertoken != null) {
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
    } else {
        res.json({message: "You must be logged in to do that!"})
    }
};

module.exports.getAllPlugins = (req, res) => {
    MinecraftPlugin.find()
        .then(results => {res.json({results: results})})
        .catch(error => {res.json({message: "Something went wrong!", error: error})})
};

module.exports.addRatingToPlugin = (req, res) => {
    const decodedJWT = jwt.decode(req.cookies.usertoken, {complete: true});

    if(req.cookies.usertoken != null) {
        MinecraftPlugin.findByIdAndUpdate({_id: req.params.id}, { $push: {ratings: req.body}})
            .then(rating => {res.json({rating: rating})})
            .catch(error => {res.json({message: "Something went wrong!", error: error})})
    }
    
}

module.exports.addTagToPlugin = (req, res) => {
    const decodedJWT = jwt.decode(req.cookies.usertoken, {complete: true});

    if(req.cookies.usertoken != null) {
        MinecraftPlugin.findByIdAndUpdate({_id: req.params.id}, { $push: {tags: req.params.tagId}})
            .then(rating => {res.json({rating: rating})})
            .catch(error => {res.json({message: "Something went wrong!", error: error})})
    }
    
}
