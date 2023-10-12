const Joke = require('../models/jokes.model');

const getAllJokes = (req, res) => {
    Joke.find()
        .then((allJokes) => res.json(allJokes))
        .catch((err) => res.status(500).json(err));
};

const getJokeById = (req, res) => {
    Joke.findOne({ _id: req.params.id })
        .then((joke) => {
            if (!joke) {
                return res.status(404).json({ message: 'Joke not found' });
            }
            res.json(joke);
        })
        .catch((err) => res.status(500).json(err));
};

const createNewJoke = (req, res) => {
    const { name, rank, punchline } = req.body;
    const newJoke = new Joke({ name, rank, punchline });

    newJoke
        .save()
        .then((joke) => res.status(201).json(joke))
        .catch((err) => res.status(500).json(err));
};

const deleteJoke = (req, res) => {
    Joke.deleteOne({ _id: req.params.id })
        .then((result) => {
            if (result.deletedCount === 0) {
                return res.status(404).json({ message: 'Joke not found' });
            }
            res.json({ message: 'Joke deleted successfully' });
        })
        .catch((err) => res.status(500).json(err));
};

module.exports = {
    getAllJokes,
    getJokeById,
    createNewJoke,
    deleteJoke,
};
