"use strict";

/**
 * Fonction permettant d'initialiser un objet littéral component.
 * Permet de l'initialiser avec son tagName, une liste d'attributs et des enfants.
 * @param  {String} tagName    Nom de la balise html à générer
 * @param  {Object} attributes Liste des attributs html à ajouter sous la forme de paires clé:valeur
 * @param  {Array}  children   Liste des enfants du composant. Chaque enfant peut être un autre component ou une String.
 */
function createComponent( tagName, attributes, children ) {
	// valeurs par défaut
	var c = {
		tagName: tagName || 'div',
		attributes: attributes || {},
		children: children || []
	};
	return c;
}

/**
 * Ajoute ou remplace un attribut.HTML dans un composant
 * @param {Object} component  composant à modifier
 * @param {String} attribute  Clé de l'attribut à modifier/ajouter
 * @param {String} value valeur de l'attribut
 * @see getComponentAttribute()
 */
function setComponentAttribute( component, attribute, value ) {
	component.attributes[ attribute ] = value;
}

/**
 * Récupère la valeur d'un attribut HTML d'un composant
 * @param {Object} component  composant à modifier
 * @param {String} attribute  Clé de l'attribut à récupérer
 * @see setComponentAttribute()
 */
function getComponentAttribute( component, attribute ) {
	return component.attributes[ attribute ];
}


/**
 * Retourne le code html correspondant au component et à ses enfants
 * et l'affiche éventuellement dans un élément html.
 * @return {String} code html généré
 * @see renderComponentAttributes()
 * @see renderComponentChildren()
 */
function renderComponent( component, element ) {
	var html = '<'+ component.tagName + ' ' + renderComponentAttributes(component) +'>'+
				renderComponentChildren( component ) +
			'</'+ component.tagName +'>';
	if ( element instanceof Element ) {
		element.innerHTML = html;
	}
	return html;
}

/**
 * Retourne le code html des attributes d'un component.
 * @param      {Object}    component  Le composant dont on doit rendre les attributs
 * @return     {String}  code html des attributs du component
 */
function renderComponentAttributes( component ) {
	var attributesHTML = [],
		attribute;
	for ( attribute in component.attributes ) {
		attributesHTML.push( ' '+attribute+'="'+getComponentAttribute(component, attribute)+'"' );
	}
	return attributesHTML.join('');
}

/**
 * Retourne le code html des enfants d'un component.
 * @param      {Object}    component  Le composant dont on doit rendre les enfants
 * @return     {String}  code html des enfants du component
 * @see renderComponent()
 */
function renderComponentChildren( component ) {
	var childrenHTML = [];
	// pour limiter les concaténations de chaines, on utilise un array
	// la fonction array.map permet de générér un novueau tableau
	// à partir des valeurs de component.children
	childrenHTML = component.children.map( function(child){
		// comme le composant supporte des enfants de type différents
		// (String ou Component) il faut faire le test ici
		return typeof child === 'string' ? child : renderComponent( child );
	});
	// on retourne la chaine complète
	return childrenHTML.join('');
}

function createButton( label, attributes ) {
	return createComponent( 'button', attributes, [ label ] );
}

function createRoundedRedButton( label, attributes ) {
	var a = {}, attribute;

	for ( attribute in attributes ) {
		a[ attribute ] = attributes[ attribute ];
	}
	a.style = 'border-radius: 5px; color: white; background-color: red';
	return createButton( label, a );
}
