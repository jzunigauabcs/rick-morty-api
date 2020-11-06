const BASE_URL = "https://rickandmortyapi.com/api/";

const fetchByPage = function(page) {
	return new Promise((resolve, reject) => 
		fetch(`${BASE_URL}character/?page=${page}`)
		.then(response => resolve(response.json())))
}

const fetchByName = function(name) {
	return new Promise((resolve, reject) => 
		fetch(`${BASE_URL}character/?name=${name}`)
		.then(response => resolve(response.json())))
}
