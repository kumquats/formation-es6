export default class API {
	// Appel du webservice qui permet de récupérer les logements en fonction d'un lieu
	static getAirbnbByPlace( location:string ){
		return fetch('airbnb.php?location=' + location )
			.then( airbnbResult => airbnbResult.json() )
			.then( data => data.results_json.search_results );
	}

	static getWeatherByPlace( location:string ) {
		const apiKey = '851b41b99f54374d348017676b74fd02';
		return fetch(`http://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}`, { method: 'get'})
			.then( weather => weather.json()  );
	}

	static convertKelvinToCelsius( temperature ) {
		return fetch('temperature.php?temperature=' + temperature)
			.then( temperature => temperature.json() );
	}
}