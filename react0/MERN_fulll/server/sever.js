const express = require("express");
const cors = require("cors");
const app = express();
const PORT =8000
const DB= 'mern_full'
//connect to db
require('./config/mongoose.config')(DB)
// middleware 
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Connect routes
require("./routes/products.route")(app)
// START THE SERVER
app.listen(PORT, () => console.log(`>> SERVER up on PORT ${PORT} <<`))
