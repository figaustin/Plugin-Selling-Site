const TagController = require('../controllers/tag.controller')

module.exports = (app) => {
    app.post("/api/tag/create", TagController.createNewTag);
    app.get("/api/tag/:id", TagController.findTagById);
    app.post("/api/tag/:id/update", TagController.updateTag);
    app.delete("/api/tag/:id/delete", TagController.deleteTag);
}