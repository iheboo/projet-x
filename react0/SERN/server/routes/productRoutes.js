const express = require('express');
const router = express.Router();
const TaskController = require('../controllers/ProductController');

console.log(TaskController, "🫧🫧🫧🫧🫧🫧🫧🫧🫧🫧");
router.get('/task', TaskController.getAllTasks);
router.post('/task', TaskController.createTask);
router.put('/task/:id', TaskController.updateTask);
router.get('/task/:id', TaskController.getSingleReview);
router.delete('/task/:id', TaskController.deleteTask);

module.exports = router;