const express = require("express");
const app = express();
const bodyParser = require("body-parser");

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
	res.sendFile("views/index.html", {root: __dirname});
})

//categories
app.get("/categories", (req, res) => {
	res.sendFile("views/categories/index.html", {root: __dirname})
})

app.get("/categories/new", (req, res) => {
	res.sendFile("views/categories/new.html", {root: __dirname})
})

app.get("/categories/:id", (req, res) => {
	res.sendFile("views/categories/detail.html", {root: __dirname})
})

app.get("/categories/:id/edit", (req, res) => {
	res.sendFile("views/categories/edit.html", {root: __dirname})
})

//api categories
app.get("/api/categories", (req, res) => {
	const categories = getCategories();
	res.send(categories)
})

app.get("/api/categories/:id", (req, res) => {
	const id = Number(req.params.id);
	const category = getCategory(id);
	res.send(category)
})

app.post("/api/categories/:id", (req, res) => {
	const id = Number(req.params.id);
	const categoryData = req.body;
	updateCategory(id, categoryData);
	res.redirect("/categories/" + id);
})

app.post("/api/categories", (req, res) => {
	const categoryData = req.body;
	const newCategory = createCategory(categoryData);
	res.redirect("/categories/" + newCategory.id);
})

app.delete("/api/categories/:id", (req, res) => {
	const id = Number(req.params.id);
	deleteCategory(id);
	res.sendStatus(204);
})

//categories database
let categoryId = 1;
let categories = [
	{title: "Home", color: "red", id: categoryId++}, 
	{title: "Work", color: "green", id: categoryId++}, 
	{title: "Exercise", color: "blue", id: categoryId++}
]; 

//get categories
function getCategories(){
	return categories;
}

//get a category
function getCategory(categoryId){
	const category = categories.find(e => e.id === categoryId);
	return category;
}

//create a category
function createCategory(categoryData){
	categoryData.id = categoryId++;
	categories.push(categoryData);
	return categoryData;
}

//edit category
function updateCategory(categoryId, categoryData){
	let i;
	for(i = 0; i < categories.length; i++){
		if(categories[i].id === categoryId){
			break
		}
	}
	const updatedCategory =  {
		...categories[i],
		...categoryData,
		id: categoryId
	}
	categories[i] = updatedCategory;
	return updatedCategory;
}

//delete category
function deleteCategory(categoryId){
	categories = categories.filter(e => e.id !== categoryId)
}

//tasks
app.get("/tasks", (req, res) => {
	res.sendFile("views/tasks/index.html", {root: __dirname})
})

app.get("/tasks/new", (req, res) => {
	res.sendFile("views/tasks/new.html", {root: __dirname})
})

app.get("/tasks/:id", (req, res) => {
	res.sendFile("views/tasks/detail.html", {root: __dirname})
})

app.get("/tasks/:id/edit", (req, res) => {
	res.sendFile("views/tasks/edit.html", {root: __dirname})
})

//api tasks


//tasks database
let taskId = 1;
let tasks = [
	{title: "nice", priority: "one", categoryId: 1, dueAt: new Date(), reminderAt: new Date(), notes: "", id: taskId++, isComplete: true},
	{title: "wow", priority: "two", categoryId: 2, dueAt: new Date(), reminderAt: new Date(), notes: "", id: taskId++, isComplete: false},
	{title: "yay", priority: "three", categoryId: 3, dueAt: new Date(), reminderAt: new Date(), notes: "", id: taskId++, isComplete: false}
]

//get a task
function getTask(taskId){
	const task = tasks.find(e => e.id === taskId);
	return task;
}

//get all tasks
function getTasks(){
	return tasks;
}

//create task
function createTask(taskData){
	taskData.id = taskId++;
	taskData.isComplete = false;
	tasks.push(taskData);
	return taskData;
}

//edit task
function updateTask(taskId, taskData){
	let i;
	for(i = 0; i < tasks.length; i++){
		if(tasks[i].id === taskId){
			break
		}
	}
	const updatedTask = {
		...tasks[i], 
		...taskData,
		id: taskId
	}
	tasks[i] = updatedTask;
	return updatedTask;
}

//delete task
function deleteTask(taskId){
	tasks = tasks.filter(e => e.id !== taskId)
}

app.listen(8000, () => console.log("server is listening on port 8000"));
