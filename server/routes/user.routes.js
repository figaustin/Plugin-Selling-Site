const express = require('express')
const UserController = require('../controllers/user.controller')

module.exports = (app) => {
    app.get("/api/user/all", UserController.getAllUsers);
    app.post("/api/user/login", UserController.login);
    app.post("/api/user/register", UserController.register);
    app.get("/api/user/getLoggedInUser", UserController.getLoggedInUser);
    app.get("/api/user/logout", UserController.logout);
    app.get("/api/user/:id", UserController.findUserById);
    app.put("/api/user/:id/purchasePlugin/:pluginId", UserController.userPurchasePlugin);
}