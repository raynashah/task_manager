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

//api categories
let categoryId = 1;
let categories = [
	{title: "Home", color: "red", id: categoryId++}, 
	{title: "Work", color: "green", id: categoryId++}, 
	{title: "Exercise", color: "blue", id: categoryId++}
]; 

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

function getCategories(){
	return categories;
}

function getCategory(id){
	return categories.find(e => e.id === id)
}

function createCategory(newCategory){
	newCategory.id = categoryId++;
	categories.push(newCategory);
	return newCategory;
}

function updateCategory(id, categoryData){
	let index;
	for(index = 0; index < categories.length; index++){
		if(categories[index].id === id){
			break
		}
	}
	categories[index] = {
		...categories[index],
		...categoryData,
		id: id
	}	
	return categories[index];
}

function deleteCategory(id){
	return categories = categories.filter(e => e.id !== id)
}

//api tasks


app.listen(8000, () => console.log("server is listening on port 8000"));
