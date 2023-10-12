const express = require("express");
const app = express();
const port = 8000;

require("./config/mongose.config");

app.use(express.json(), express.urlencoded({ extended: true }));

const JokeRoutes = require("./routes/joker.routes");
JokeRoutes(app);
const RateRoutes = require("./routes/rate.routes");
RateRoutes(app);

app.listen(port, () => console.log(`Express running on port ${port}`));