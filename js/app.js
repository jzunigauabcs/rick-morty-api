const DELAY_MS = 100;

const randomPage = function() {
	const  MAX_PAGE = 34;
	return Math.floor(Math.random() * MAX_PAGE + 1)
}

const toggleLoading = function () {
	 $(".loading-container").toggleClass("hidden");
}

const delayLoading = function () {
	return new Promise(function(resolve, reject) {
		setTimeout(resolve, DELAY_MS);
	})
}


const templateCard = function({name, image, gender, species, episode}) {
	return `<div class="card mb-5">
					<duv class="card-img">
						<img src="${image}" alt="">
					</duv>
					<div class="card-content">
						<h3 class="card-header-title">${name}</h3>
						<div class="content">
							<ul>
								<li class="list"><strong>Género: </strong>${gender}</li>
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
	const cardsContainer = $(".cards");
	cardsContainer.html("");

	toggleLoading()
	delayLoading()
	.then(function() {
		return callback()
	})
	.then(response => {
		const {results} = response
		toggleLoading()
		cardsContainer.html(loadCards(results))
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
	const btnReload = $("#btnReload");
	btnReload.on('click', () => {
		renderByRandomPage();
	})
	const formSearch = $("#formSearch");
	formSearch.on('submit', (e) => {
		e.preventDefault();
		const name = $("#searchBox").val();
		renderByName(name);
		console.log("Hola")
	})
}

$(document).ready(function () {
	init()
});
