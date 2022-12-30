const User = require('../models/user.model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const axios = require('axios')

module.exports.findUserById = (req, res) => {
    User.findOne({_id: req.params.id})
        .then(user => {res.json({user: user})})
        .catch(error => res.json({message: "Something went wrong!", error: error}))
};

module.exports.findUsersUploadedPlugins = (req, res) => {
    User.findOne({_id: req.params.id})
        .then(user => {res.json({uploadedPlugins: user.uploadedPlugins})})
        .catch(error => {res.json({message: "Something went wrong!", error: error})})
};

module.exports.findUserPurchasedPlugins = (req, res) => {
    User.findOne({_id: req.params.id})
        .then(user => {res.json({purchasedPlugins: user.purchasedPlugins})})
        .catch(error => {res.json({message: "Something went wrong!", error: error})})
};

module.exports.getAllUsers = (req, res) => {
    User.find()
        .then(allUsers => {res.json({results: allUsers})})
        .catch(error => {res.json({message: "Something went wrong!", error: error})})
};

module.exports.register = (req, res) => {
    User.find({email: req.body.email})
        .then(usersWithEmail => {

            if(usersWithEmail.length === 0) {
                User.create(req.body)
                    .then(user => {
                        const userToken = jwt.sign({
                            id: user._id,
                            username: user.username
                        }, "TestingSecretKey");

                        res.cookie('usertoken', userToken, "TestingSecretKey", {
                            httpOnly: true
                        })
                        .json({message: "Registration Success!", user: user})
                    })
                    .catch(error => res.json({message: "Something went wrong!", error: error}))
            } else {
                res.json({errors: {email: {message: "That email is already being used!"}}})
            }
        })
        .catch(error => {res.json({message: "Something went wrong!", error: error})})
};