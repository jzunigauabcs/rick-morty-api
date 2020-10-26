const BASE_URL = "https://rickandmortyapi.com/api/";
const DELAY_MS = 2000;

const randomPage = function () {
	const MAX_PAGE = 34;
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

const fetchByPage = function (page) {
	return new Promise((resolve, response) => {
		fetch(`${BASE_URL}character/?page=${page}`)
		.then(response => resolve(response.json()));	
	})
}

const makeCard = function(information) {
	return `<div class="card">
					<div class="card-img">
						<img src="${information.image}" alt="">
					</div>
					<div class="card-body">
						<h3 class="card-title">${information.name}</h3>
						<div class="card-information">
							<ul>
								<li><strong>Género: </strong>${information.gender}</li>
								<li><strong>Especie: </strong>${information.species}</li>
								<li><strong>Episodios: </strong>${information.episode.length}</li>
							</ul>
						</div>
					</div>
				</div>`
}

const loadCards = function (information) {
	let childs = "";
	information.forEach(i => {
		childs += makeCard(i)	
	})
	return childs;
}

const render = function(fn) {
	const cardsContainer = document.querySelector(".cards");
	cardsContainer.innerHTML = "";
	
	toggleLoading()
	delayLoading()
	.then(() => {
		return fn()
	})
	.then(response => {
		const {results} = response;
		console.log(results);
		toggleLoading();
		cardsContainer.innerHTML = loadCards(results)
	})
	
}

const init = function () {
	const page = randomPage();
	render(function(){return fetchByPage(page)})
}

init();
