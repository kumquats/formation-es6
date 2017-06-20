// @flow
// use strict reste nécessaire en es6+ sauf dnas les classes et les modules
// où il est implicite
'use strict';

/**
 * Fonction permettant d'initialiser un objet littéral component.
 * Permet de l'initialiser avec son tagName, une liste d'attributs et des enfants.
 * @param  {String} tagName    Nom de la balise html à générer
 * @param  {Object} attributes Liste des attributs html à ajouter sous la forme de paires clé:valeur
 * @param  {Array}  children   Liste des enfants du composant. Chaque enfant peut être un autre component ou une String.
 */
// on utilise ici une arrow function et des valeurs par défaut
const createComponent = ( tagName:string = 'div', attributes:?{} = {}, children:Array<mixed> = [] ):any => ({
	// on utilise la notation raccourcie pour la création d'objets littéraux
	// les parenthèses autour de l'objet littéral permettent au navigateur
	// de savoir qu'il s'agit d'une valeur de retour de type objet littéral
	// et pas d'un bloc de code !
	tagName,
	attributes,
	children,
	// Fonction Iterator :
	[Symbol.iterator]() {
		return {
			i: 0,
			children: this.children,
			next() {
				if (this.i >= this.children.length) {
					return { done: true };
				}
				return {value:this.children[ this.i++ ]};
			}
		};
	},
	// Generator function :
	*getAttributes() {
		for (let attribute:string in this.attributes){
			yield { attribute, value: getComponentAttribute(this, attribute) };
		}
	}
});

/**
 * Ajoute ou remplace un attribut.HTML dans un composant
 * @param {Object} component  composant à modifier
 * @param {String} attribute  Clé de l'attribut à modifier/ajouter
 * @param {String} value valeur de l'attribut
 * @see getComponentAttribute()
 */
// ESLint détecte que cette fonction est inutilisée, on la commente car, elle servira peut-être par la suite...
// const setComponentAttribute = ( component, attribute:string, value:string ) =>	{
// 	component.attributes[ name ] = value;
// };

/**
 * Récupère la valeur d'un attribut HTML d'un composant
 * @param {Object} component  composant à modifier
 * @param {String} attribute  Clé de l'attribut à récupérer
 * @see setComponentAttribute()
 */
// utilisation d'une arrow function en notation raccourcie
// la partie après la flèche est la valeur de retour
const getComponentAttribute = ( component, attribute:string ):string => component.attributes[ attribute ];


/**
 * Retourne le code html correspondant au Component et à ses enfants
 * et l'affiche éventuellement dans un élément html.
 * @return {String} code html généré
 * @see renderComponentAttributes()
 * @see renderComponentChildren()
 */
const renderComponent = ( component:{tagName:string, attributes:{}, children:[]}, element = null ):string => {
	// utilisation du destructuring pour accéder à une propriété d'un objet
	const {tagName} = component;
	// utilisation d'une arrow function
	const html:string = `<${tagName} ${renderComponentAttributes(component)}>
				${renderComponentChildren( component )}
			</${tagName}>`;
	if ( element instanceof Element ) {
		element.innerHTML = html;
	}
	return html;
};

/**
 * Retourne le code html des attributes d'un component.
 * @param      {Object}    component  Le composant dont on doit rendre les attributs
 * @return     {String}  code html des attributs du component
 */
const renderComponentAttributes = ( component:any ) => { //any pour autoriser le generator
	const attributesHTML:Array<string> = [];
	// let étant une déclaration scopée, plus besoin de la déclarer en haut de fonction
	// `attribute` n'existe qu'à l'intérieur du for
	// for ( let attribute in component.attributes ) {
	// 	attributesHTML.push( ` ${attribute}="${component.attributes[ attribute ]}"` );
	// }

	// utilisation de la generator function *getAttributes
	for ( const {attribute, value} of component.getAttributes() ) {
		attributesHTML.push( ` ${attribute}="${value}"` );
	}

	return attributesHTML.join('');
};

/**
 * Retourne le code html des enfants d'un component.
 * @param      {Object}    component  Le composant dont on doit rendre les enfants
 * @return     {String}  code html des enfants du component
 * @see renderComponent()
 */
// const renderComponentChildren = component => component.children.map(
// 		child => typeof child === 'string' ? child : renderComponent( child )
// 	).join('');
// NB : cette notation bien qu'ultra abrégée et profitant des évolutions de la syntaxe ES6+
// n'en reste pas moins peu lisible.
//
// version utilisant l'itérator
const renderComponentChildren = (component:any) => { //any pour autoriser l'iterator
	const childrenHTML:Array<string> = [];
	for ( const child of component ){
		childrenHTML.push( typeof child === 'string' ? child : renderComponent( child ) );
	}
	return childrenHTML.join('');
};

const createButton = ( label:string = 'Ne surtout pas cliquer ici', attributes:?{} ):any =>
	createComponent( 'button', attributes, [ label ] );

const createRoundedRedButton = ( label:string, attributes:{} ):any => {
	// on utilise ici une feature en stage-3 à l'heure actuelle
	// cf. https://github.com/tc39/proposal-object-rest-spread
	// nécessite l'activation des fonctionnalités javascript expérimentales dans chrome
	const a:{} = {
		...attributes,
		style : 'border-radius: 5px; color: white; background-color: red'
	};
	return createButton( label, a );
};


const component = createComponent( 'div', { style: 'border: 1px solid black' }, [
	createComponent( 'h3', {}, [
		'Test du ',
		createComponent( 'strong', { style: 'color: blue' }, [ 'framework' ] ),
		' ui'
	] ),
	createComponent( 'input', { type: 'text', value: 'Ca a l\'air de fonctionner correctement', style: 'width: 500px' } )
] );
renderComponent( component, document.querySelector( '#component-container' ));

const button = createButton( 'Ceci est un bouton' );
renderComponent( button, document.querySelector( '#button-container' ));

const roundedRedButton = createRoundedRedButton(
	'Ceci est un bouton rouge arrondi',
	{ onclick: 'alert(\'au secours, on me clique dessus !\')' }
);
renderComponent( roundedRedButton, document.querySelector( '#rounded-red-button-container' ));