const Product = require('../models/product.model')

module.exports = {
     // Read All
     findAll: (req, res) => {
        Product.find()
            .then(allProducts => res.json(allProducts))
            .catch(err => res.json(err))
    },
    // CREATE
    create: (req, res) => {
        Product.create(req.body)
            .then(newProduct => {
                console.log("Product created successfully!");
                res.json(newProduct)
            })
            .catch(err => res.json(err))
    },
    // Get product by id
    findOne: (req, res) => {
        Product.findOne({ _id: req.params.id })
            .then(product => {
                console.log("Product found by id!");
                res.json(product)
            })
            .catch(err => res.json(err))
    }

}
   
    