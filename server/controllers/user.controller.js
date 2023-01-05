const User = require('../models/user.model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const MinecraftPlugin = require('../models/plugin.model')


module.exports.findUserById = (req, res) => {
    User.findOne({_id: req.params.id}).populate('purchasedPlugins').populate('uploadedPlugins')
        .then(user => {res.json({user: user})})
        .catch(error => res.json({message: "Something went wrong!", error: error}))
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

module.exports.userPurchasePlugin = (req, res) => {
    const decodedJWT = jwt.decode(req.cookies.usertoken, {complete: true})

   
    if(req.cookies.usertoken != null) {
        if(decodedJWT.payload.id == req.params.id || decodedJWT.payload.admin) {
            const purchase = {
                plugin_id: req.params.pluginId
            }
        
            User.findOne({_id: req.params.id})
                .then(user => {
                    const alreadyPurchased = (item) => item === req.params.pluginId;
                    
                    if(user.purchasedPlugins.some(alreadyPurchased)) {
                        res.json({message: "User has already purchased this plugin!"})
                    }
                    else {
                        

                        User.findByIdAndUpdate({_id: decodedJWT.payload.id}, { $push: {purchasedPlugins: purchase}})
                        .then(user => {res.json({user: user})})
                        .catch(error => {res.json({message: "Something went wrong!", error: error})})
                    }
                })

        } else {
            res.json({message: "Something went wrong!"})
        }
    } else {
        res.json({message: "Please login to do that!"})
    }
}

