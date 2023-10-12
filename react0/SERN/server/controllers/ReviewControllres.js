const Review = require("../models/Review");
const Product = require("../models/Product");
exports.getAllTasks_1 = (req, res) => {
    Review.findAll()
      .then(Task_1 => {
        res.json(Task_1);
      })
      .catch(error => {
        res.status(500).json({ error: 'Internal server error' });
      });
  };
  
  exports.createTask_1 = (req, res) => {
    const taskId = req.params.taskId;
  
    Review.findByPk(taskId)
      .then(task => {
        if (!task) {
          return res.status(404).json({ error: 'Task not found' });
        }
  
        const { rating, description } = req.body;
  
        Product.create({ rating, description, taskId })
          .then(newTask1 => {
            res.status(201).json(newTask1);
          })
          .catch(error => {
            res.status(500).json({ error: 'Internal server error' });
          });
      })
      .catch(error => {
        res.status(500).json({ error: 'Internal server error' });
      });
  };
  
  exports.updateTask_1 = (req, res) => {
    const { id } = req.params;
    const { rating, description } = req.body;
  
    Product.findOne({ where: { id } })
      .then(task => {
        if (!task) {
          return res.status(404).json({ error: 'Task not found' });
        }
  
        task.rating = rating;
        task.description = description;
  
        return Review.save();
      })
      .then(updatedTask1 => {
        res.json(updatedTask1);
      })
      .catch(error => {
        res.status(500).json({ error: 'Internal server error' });
      });
  };
  
  exports.getSingleTask_1forTask = (req, res) => {
    const taskId = req.params.taskId;
  
    Review.findByPk(taskId, { include: Task_1 })
      .then(task => {
        if (!task) {
          return res.status(404).json({ error: 'Task not found' });
        }
  
        res.status(200).json(task.Task_1);
      })
      .catch(error => {
        res.status(500).json({ error: 'Internal server error' });
      });
  };
  
  exports.deleteTask_1 = (req, res) => {
    const { id } = req.params;
  
    Product.findOne({ where: { id } })
      .then(task => {
        if (!task) {
          return res.status(404).json({ error: 'Task not found' });
        }
  
        return Review.destroy();
      })
      .then(() => {
        res.json({ message: 'Task deleted successfully' });
      })
      .catch(error => {
        res.status(500).json({ error: 'Internal server error' });
      });
  };
  