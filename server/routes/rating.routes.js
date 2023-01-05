const RatingController = require('../controllers/rating.controller')

module.exports = (app) => {
    app.get("/api/rating/:id", RatingController.findRatingById);
    app.post("/api/rating/create/:pluginId", RatingController.createNewRating);
    app.post("/api/rating/update/:id", RatingController.updateRating);
    app.delete("/api/rating/delete/:id", RatingController.deleteRating);
}