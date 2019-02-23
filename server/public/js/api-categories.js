async function	getCategories(){
	const categoriesResponse = await fetch("/api/categories");
	const categories = await categoriesResponse.json();
	console.log(categories);
	return categories;
}

async function getCategory(id){
	const categoryDetail = await fetch("/api/categories/" + id)
	const category = await categoryDetail.json()
	console.log(category)
	return category;
}

function getCategoryIdFromUrl(){
	const id = window.location.pathname.split("/")[2];
	return id;
}