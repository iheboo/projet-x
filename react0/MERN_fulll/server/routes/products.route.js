// import the controller
const Product = require("../controllers/products.controller")

module.exports = (app) => {
    app.get("/api/products", Product.findAll)
    app.post("/api/products", Product.create)
    app.get("/api/products/:id", Product.findOne)
}
