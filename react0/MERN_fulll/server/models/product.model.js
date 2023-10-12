const mongoose = require("mongoose")

const ProduSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "{PATH} must be present."],
        minLength: [3, "{PATH} must be at least 3 chars long."]
    },
    price: {
        type: Number,
        required: [true, "{PATH} must be present."]
    },
    description: {
        type: String,
        required: [true, "{PATH} must be present."],
        minLength: [8, "{PATH} must be at least 8 chars long."]
    }
},{ timestamps: true })


// create the schema and export it
const Product =mongoose.model('Product',ProduSchema)
module.exports = Product