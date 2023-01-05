const express = require('express');
const MinecraftPluginController = require('../controllers/plugin.controller');

module.exports = (app) => {
    app.get("/api/plugin/:id", MinecraftPluginController.findPluginById);
    app.get("/api/plugin/all", MinecraftPluginController.getAllPlugins);
    app.post("/api/plugin/create", MinecraftPluginController.addNewPlugin);
    app.put("/api/plugin/update/:id", MinecraftPluginController.updatePlugin);
    app.delete("/api/plugin/delete/:id", MinecraftPluginController.deletePlugin);
    app.post("/api/plugin/:id/ratings/add", MinecraftPluginController.addRatingToPlugin);
    app.post("/api/plugin/:id/tags/add/:tagId", MinecraftPluginController.addTagToPlugin);
    app.post("/api/plugin/:id/upload", MinecraftPluginController.uploadPlugin);
    app.get("/api/plugin/:id/download", MinecraftPluginController.downloadPlugin);
}