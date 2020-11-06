const BASE_URL = "https://rickandmortyapi.com/api/";
const DELAY_MS = 100;

const randomPage = function() {
	const  MAX_PAGE = 34;
	return Math.floor(Math.random() * MAX_PAGE + 1)
}

const toggleLoading = function () {
	const loadingContainer = document.querySelector(".loading-container");
	loadingContainer.classList.toggle("hidden");
}

/*const delayLoading = function () {
	toggleLoading()
	setTimeout(() => {
		toggleLoading()
	}, DELAY_MS);
}*/

const delayLoading = function () {
	return new Promise((resolve, reject) => {
		setTimeout(resolve, DELAY_MS)
	});	
}

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

const templateCard = function({name, image, gender, species, episode}) {
	return `<div class="card">
					<div class="card-img">
						<img src="${image}" alt="">
					</div>
					<div class="card-body">
						<h3 class="card-title">${name}</h3>
						<div class="card-information">
							<ul>
								<li><strong>Género: </strong>${gender}</li>
								<li><strong>Especie: </strong>${species}</li>
								<li><strong>Episodios: </strong>${episode}</li>
							</ul>
						</div>
					</div>
				</div>`
}

const loadCards = function(results) {
	let childs = "";
	results.forEach(r => {
		const cardInformation = {
			name: r.name,
			image: r.image,
			gender: r.gender,
			species: r.species,
			episode: r.episode.length
		}
		childs += templateCard(cardInformation)
	})
	return childs;
}

const render = function(callback) {
	const cardsContainer = document.querySelector(".cards");
	cardsContainer.innerHTML = "";
	
	toggleLoading();
	delayLoading()
	.then(function() {
		return callback()
	})
	.then(response => {
		const {results} = response
		toggleLoading()
		cardsContainer.innerHTML = loadCards(results)
	})
	.catch(function() {
		console.error("Ocurrió un error")
	})
	
}

const renderByRandomPage = function () {
	const page = randomPage();
	render(function() { return fetchByPage(page)})
}
const renderByName = function (name) {
	render(function() { return fetchByName(name)})
}


const init = function () {
	renderByRandomPage();
	const btnReload = document.querySelector("#btnReload");
	btnReload.addEventListener('click', () => {
		renderByRandomPage();
	})
	const formSearch = document.querySelector("#formSearch");
	formSearch.addEventListener('submit', (e) => {
		e.preventDefault();
		const name = document.querySelector("#searchBox").value;
		renderByName(name);
	})
}

init();
