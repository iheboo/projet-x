const mongoose = require("mongoose");
const Rate = require("../models/rate.model");


const JokeSchema = new mongoose.Schema(
  {
    name: String,
    punchline: String,
    rates: [Rate],
  },
  { timestamps: true }
);

const Joke = mongoose.model("Joke", JokeSchema);

module.exports = Joke;