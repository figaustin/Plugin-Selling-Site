const User = require('../models/user.model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const axios = require('axios')
const mongoose = require('mongoose')
const MinecraftPlugin = require('../models/plugin.model')


module.exports.findUserById = (req, res) => {
    User.findOne({_id: req.params.id})
        .then(user => {res.json({user: user})})
        .catch(error => res.json({message: "Something went wrong!", error: error}))
};

module.exports.findUsersUploadedPlugins = (req, res) => {
    MinecraftPlugin.find({author: req.params.author_id})
        .then(user => {res.json({uploadedPlugins: user.uploadedPlugins})})
        .catch(error => {res.json({message: "Something went wrong!", error: error})})
};

module.exports.findUserPurchasedPlugins = (req, res) => {
    User.find({_id: req.params.id})
        .then(user => {res.json({purchasedPlugins: user.purchasedPlugins})})
        .catch(error => {res.json({message: "Something went wrong!", error: error})})
};

module.exports.getAllUsers = (req, res) => {
    User.find()
        .then(allUsers => {res.json({results: allUsers})})
        .catch(error => {res.json({message: "Something went wrong!", error: error})})
};

module.exports.login = async(req, res) => {
    const user = await User.findOne({email: req.body.email });

        if(user === null){
            return res.json({error: "User not found."})
        }

        const correctPassword = await bcrypt.compare(req.body.password, user.password);

        if(!correctPassword) {
            return res.json({error: "Password is incorrect!"})
        }

        const userToken = jwt.sign({
            id: user._id,
            userName : user.userName,
            admin: user.admin
        }, "TokEN!");

        res.cookie('usertoken', userToken, "TokEN!", {httpOnly: true})
            .json({message: "Login Success!"});
}

module.exports.register = (req, res) => {
    User.find({email: req.body.email})
        .then(usersWithEmail => {

            if(usersWithEmail.length === 0) {
                User.create(req.body)
                    .then(user => {
                        const userToken = jwt.sign({
                            id: user._id,
                            userName: user.userName,
                            admin: user.admin
                        }, "TokEN!");

                        res.cookie('usertoken', userToken, "TokEN!", {
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

module.exports.logout = (req, res) => {
    res.clearCookie('usertoken');
    res.sendStatus(200);
}

module.exports.getLoggedInUser = (req, res) => {
    const decodedJWT = jwt.decode(req.cookies.usertoken, {complete: true})

    User.findOne({_id: decodedJWT.payload.id})
        .then(foundUser => {res.json({results: foundUser})})
        .catch(error => {res.json({message: "Something went wrong!", error: error})})
};

