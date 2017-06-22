// @flow
// use strict reste nécessaire en es6+ sauf dnas les classes et les modules
// où il est implicite
'use strict';

import Component from './Component';
import Button from './Button';
import RoundedRedButton from './RoundedRedButton';

const component:Component = new Component( 'div', { style: 'border: 1px solid black' }, [
	new Component( 'h3', {}, [
		'Test du ',
		new Component( 'strong', { style: 'color: blue' }, [ 'framework' ] ),
		' ui'
	] ),
	new Component( 'input', { type: 'text', value: 'Ca a l\'air de fonctionner correctement', style: 'width: 500px' } )
] );
component.render( document.querySelector( '#component-container' ));

const button:Button = new Button( 'Ceci est un bouton' );
button.render( document.querySelector( '#button-container' ));

const roundedRedButton:RoundedRedButton = new RoundedRedButton(
	'Ceci est un bouton rouge arrondi',
	{ onclick: 'alert(\'au secours, on me clique dessus !\')' }
);
roundedRedButton.render( document.querySelector( '#rounded-red-button-container' ));