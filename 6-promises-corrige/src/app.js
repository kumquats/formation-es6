// @flow

import API from './API';
import Component from './Component';
import Title from './Title';
import Thumbnail from './Thumbnail';

// éléments HTML qui seront utilisés dans l'appli
const form:any = document.querySelector('form');
const loading:any = document.querySelector('.progress');

// on écoute la soumission du formulaire
form.addEventListener('submit', event => {
	// on empêche la page de se recharger
	event.preventDefault();
	// on affiche la barre de loading
	loading.style.display = '';
	// on récupère la ville sélectionnée
	const location:string = form.querySelector('[name=location]').value;
	// on lance les appels à airbnb et openweather en même temps
	Promise.all([
		API.getAirbnbByPlace( location ),
		API.getWeatherByPlace( location )
			// une fois l'appel à openweather terminé
			// on lance un nouvel appel au webservice temperature
			// pour convertir la température en °C
			.then( weather => API.convertKelvinToCelsius( weather.main.temp ) )
	])
		// une fois tous les appels webservice terminés
		// on affiche les résultats
		.then( displayResults )
		.catch( error => console.log(error) );
});

const displayResults = ( [ airbnbResult, {temperature} ] ) => {
	console.log(airbnbResult, temperature);
	// on masque la barre de loading
	loading.style.display = 'none';
	// const title:Component = new Component('h2',{}, [`Temperature : ${temperature}°C`]);
	const title:Title = new Title(`Temperature : ${temperature}°C`);
	const results:Component = new Component(
		'ul',
		{},
		airbnbResult.map( item =>
			// pour chaque lieu on ajoute un <li> avec les infos du lieu (image + titre)
			//
			// utilisation de Component génériques :
			// new Component('li', {class: 'list-group-item'}, [
			// 	new Component('img', {src: item.listing.picture_url, style:'width:100%' }),
			// 	new Component('h4', {}, [item.listing.name])
			// ])
			//
			// utilisation de la classe Thumbnail :
			new Thumbnail( item )
		)
	);
	// création d'un container qui contiendra le titre et la liste des résultats
	const container:Component = new Component( 'div', {}, [title, results] );
	// affichage dans la page html
	container.render( document.querySelector('.resultsContainer') );
};

