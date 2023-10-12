const express = require('express');
const router = express.Router();
const jokeControllers = require('../controllers/joke.controllers');

router.get('/jokes', jokeControllers.getAllJokes);
router.get('/jokes/:id', jokeControllers.getJokeById);
router.post('/jokes', jokeControllers.createNewJoke);
router.delete('/jokes/:id', jokeControllers.deleteJoke);

module.exports = router;
