const express = require('express');

const app = express();
const Port = 8000;


// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
const jokesRoute = require('./routes/joke.routes');
app.use('/api', jokesRoute);

app.listen(Port, () => console.log(`Express is running on port ${Port}`));
