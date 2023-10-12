const mongoose = require("mongoose");

module.exports = (DB) => {
    mongoose.connect(`mongodb://127.0.0.1/${DB}`)
        .then(() => console.log(`🦄🦄🦄 connected to ${DB} db `))
        .catch(err => console.log(`⚠⚠⚠ cannot connect to ${DB}`, err))
}