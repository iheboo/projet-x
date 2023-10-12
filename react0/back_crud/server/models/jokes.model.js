const mongoose = require('mongoose');

const JokeSchema = new mongoose.Schema({
    name: String,
    rank: Number,
    punchline: String,
}, { timestamps: true });

const Joke = mongoose.model('Joke', JokeSchema);

module.exports = Joke;
