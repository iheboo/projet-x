// routes/taskRoutes_1.js
const express = require('express');
const router = express.Router();
const TaskController_1 = require('../controllers/ReviewControllres');

router.get('/task_1/:taskId', TaskController_1.getAllTasks_1);
router.post('/task_1/:taskId', TaskController_1.createTask_1);
router.put('/task_1/:taskId/:id', TaskController_1.updateTask_1);
router.get('/task_1/:taskId/:id', TaskController_1.getSingleTask_1forTask);
router.delete('/task_1/:taskId/:id', TaskController_1.deleteTask_1);

module.exports = router;
