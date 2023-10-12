const mongoose = require("mongoose");

const RateSchema = new mongoose.Schema(
  {
    rank: Number,
    comment: String,
  },
  { timestamps: true }
);

const Rate = mongoose.model("Rate", RateSchema);

module.exports = Rate