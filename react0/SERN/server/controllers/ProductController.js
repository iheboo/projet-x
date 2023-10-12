const Product =require("../models/Product");
const Review =require("../models/Review");

module.exports = {
	getAllTasks : (req, res) => {
		Product.findAll()
			.then(tasks => {
				res.status(200).json(tasks);
			})
			.catch(error => {
				res.status(400).json(error);
				console.log(error);
			});
	},
	
	createTask : (req, res) => {
		console.log(re.cookies.userId,"🎈🎈🎈🎈🎈🎈🎈");
		const { title, description, price} = req.body;
		Product.create({ title, description, price ,userId:1 })
			.then(newTask => {
				res.status(201).json(newTask);
			})
			.catch(error => {
				console.log(error);
			});
	},
	
	updateTask : (req, res) => {
		const { id } = req.params;
		const { title, description, price, completed } = req.body;
	
		console.log(req.body);
	
		Product.findOne({ where: { id } })
			.then(task => {
				if (!task) {
					return res.status(404).json({ error: "Task not found" });
				}
	
				task.title = title;
				task.description = description;
				task.price = price;
				task.completed = completed;
	
				return task.save();
			})
			.then(updatedTask => {
				res.json(updatedTask);
			})
			.catch(error => {
				res.status(500).json({ error: "Internal server error" });
			});
	},
	
	getSingleReview : (req, res) => {
		const taskId = req.params.id;
	
		Review.findByPk(taskId, { include: Task_1 })
			.then(task => {
				if (!task) {
					return res.status(404).json({ error: "Task not found" });
				}
	
				res.status(200).json(task);
			})
			.catch(error => {
				res.status(500).json({ error: "Internal server error" });
			});
	},
	
	deleteTask : (req, res) => {
		const { id } = req.params;
	
		Product.findOne({ where: { id } })
			.then(task => {
				if (!task) {
					return res.status(404).json({ error: "Task not found" });
				}
	
				return task.destroy();
			})
			.then(() => {
				res.json({ message: "Task deleted successfully" });
			})
			.catch(error => {
				res.status(500).json({ error: "Internal server error" });
			});
	},
}
