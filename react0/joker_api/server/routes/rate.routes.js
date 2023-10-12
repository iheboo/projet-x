const RateControllers = require('../controllers/rate.controllers');

module.exports = (app)=>{
    // get all ratings for a one joke 
    app.get("/api/jokes/:jokeId/ratings",RateControllers.getAllRatingsForJoke)
    // CREACTE a new rating for a specific joke
    app.post("/api/jokes/:jokeId/ratings",RateControllers.createNewRatingForJoke)

    app.put("/api/ratings/:_id",RateControllers.updateRatingForJoke)
    app.delete("/api/ratings/:_id",RateControllers.deleteRatingForJoke)
}