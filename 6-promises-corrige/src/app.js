// @flow

import API from './API';
import Component from './Component';

const form:any = document.querySelector('form');
const loading:any = document.querySelector('.progress');
form.addEventListener('submit', event => {
	event.preventDefault();
	loading.style.display = '';
	const location:string = form.querySelector('[name=location]').value;
	Promise.all([
		API.getAirbnbByPlace( location ),
		API.getWeatherByPlace( location )
			.then( weather => API.convertKelvinToCelsius( weather.main.temp ) )
	])
		.then( displayResults )
		.catch( error => console.log(error) );
});

const displayResults = ([ airbnbResult, {temperature} ]) => {
	console.log(airbnbResult, temperature);
	loading.style.display = 'none';
	const title:Component = new Component('h2',{}, [`Temperature : ${temperature}°C`]);
	const results:Component = new Component(
		'ul',
		{},
		airbnbResult.map( item =>
			// pour chaque lieu on ajoute un <li> avec les infos du lieu (image + titre)
			new Component('li', {class: 'list-group-item'}, [
				new Component('img', {src: item.listing.picture_url, style:'width:100%' }),
				new Component('h4', {}, [item.listing.name])
			])
		)
	);
	const container:Component = new Component('div', {}, [title, results]);
	container.render(document.querySelector('.resultsContainer'));
};

