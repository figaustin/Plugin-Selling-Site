const express = require('express');
const MinecraftPluginController = require('../controllers/plugin.controller');

module.exports = (app) => {
    app.get("/api/plugin/:id", MinecraftPluginController.findPluginById);
    app.get("/api/plugin/all", MinecraftPluginController.getAllPlugins);
    app.post("/api/plugin/create", MinecraftPluginController.addNewPlugin);
    app.post("/api/plugin/update/:id", MinecraftPluginController.updatePlugin);

}