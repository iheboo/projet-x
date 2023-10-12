const Rate = require("../models/rate.model");
const Joke = require("../models/joke.model");

// Get all ratings for a specific joke
const getAllRatingsForJoke = (req, res) => {
  Joke.findById(req.params.jokeId)
    .then((joke) => {
      if (!joke) {
        return res.status(404).json({ error: "Joke not found" });
      }
      res.json(joke.rates);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: "Server error" });
    });
};

// Create a new rating for a specific joke
const createNewRatingForJoke = (req, res) => {
  Joke.findById(req.params.jokeId)
    .then((joke) => {
      if (!joke) {
        return res.status(404).json({ error: "Joke not found" });
      }

      const newRating = new Rate(req.body);
      joke.rates.push(newRating);
      return joke.save();
    })
    .then(() => {res.json(newRating);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: "Server error" });
    });
};

// Update a rating for a specific joke
const updateRatingForJoke = (req, res) => {
  Joke.findById(req.params.jokeId)
    .then((joke) => {
      if (!joke) {
        return res.status(404).json({ error: "Joke not found" });
      }

      const rating = joke.rates.id(req.params._id);
      if (!rating) {
        return res.status(404).json({ error: "Rating not found" });
      }

      rating.set(req.body);
      return joke.save();
    })
    .then((joke) => {
      res.json(rating);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: "Server error" });
    });
};

// Delete a rating for a specific joke
const deleteRatingForJoke = (req, res) => {
  Joke.findById(req.params.jokeId)
    .then((joke) => {
      if (!joke) {
        return res.status(404).json({ error: "Joke not found" });
      }

      const rating = joke.rates.id(req.params._id);
      if (!rating) {
        return res.status(404).json({ error: "Rating not found" });
      }

      rating.remove();
      return joke.save();
    })
    .then(() => {
      res.json({ message: "Rating deleted" });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: "Server error" });
    });
};

module.exports = {
  getAllRatingsForJoke,
  createNewRatingForJoke,
  updateRatingForJoke,
  deleteRatingForJoke,
};
