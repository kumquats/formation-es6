// @flow




// Appel du webservice qui permet de récupérer les logements en fonction d'un lieu
const getAirbnbByPlace = ( city ) => {
	return fetch('airbnb.php?location=' + city )
		.then( airbnbResult => airbnbResult.json() )
		.then( data => data.results_json.search_results );
};
const getWeatherByPlace = ( city ) => {
	const apiKey = '851b41b99f54374d348017676b74fd02';
	return fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`, { method: 'get'})
		.then( weather => weather.json()  );
};
const convertKelvinToCelsius = ( temperature ) => {
	return fetch('temperature.php?temperature=' + temperature).then( temperature => temperature.json() );
};



const form:any = document.querySelector('form');
form.addEventListener('submit', event => {
	event.preventDefault();
	// $FlowFixMe
	const location:string = form.querySelector('[name=location]').value;
	Promise.all([
		getAirbnbByPlace( location ),
		getWeatherByPlace( location )
			.then( weather => convertKelvinToCelsius( weather.main.temp ) )
	])
		.then( displayResults )
		.catch( error => console.log(error) );
});

const displayResults = ([ airbnbResult, {temperature} ]) => {
	console.log(airbnbResult, temperature);
	const title:Array<string> = [`<h2>Temperature : ${temperature}°C</h2>`];
	const results:Array<string> = airbnbResult.map( item =>
		// pour chaque lieu on ajoute un <li> avec les infos du lieu (image + titre)
		`<li class="list-group-item">
				<img style="width:100%" src="${item.listing.picture_url}" />
				<h4>${item.listing.name}</h4>
		</li>`
	);
	const html:Array<string> = [...title, ...results];
	document.querySelector('.resultsContainer').innerHTML = html.join('');
};

