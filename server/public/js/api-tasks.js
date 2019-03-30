async function getTasks(){
	const response = await fetch("/api/tasks");
	const tasksData = await response.json();
	console.log(tasksData);
	return tasksData;
}

async function getTask(taskId){
	const response = await fetch("/api/tasks/" + taskId);
	const taskData = await response.json();
	console.log(taskData);
	return taskData;
}

function getTaskIdFromUrl(){
	const taskId = window.location.pathname.split("/")[2];
	return taskId;
}

function formatDate(date){
	return new Date(date).toLocaleDateString("en-US", {
		weekday: "long",
		month: "long",
		day: "numeric",
		year: "numeric",
		hour: "numeric",
		minute: "2-digit",
	})
}