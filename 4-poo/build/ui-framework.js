
// use strict reste nécessaire en es6+ sauf dnas les classes et les modules
// où il est implicite
"use strict";

/**
 * Fonction permettant d'initialiser un objet littéral component.
 * Permet de l'initialiser avec son tagName, une liste d'attributs et des enfants.
 * @param  {String} tagName    Nom de la balise html à générer
 * @param  {Object} attributes Liste des attributs html à ajouter sous la forme de paires clé:valeur
 * @param  {Array}  children   Liste des enfants du composant. Chaque enfant peut être un autre component ou une String.
 */
// on utilise ici une arrow function et des valeurs par défaut

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var createComponent = function createComponent() {
	var tagName = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'div';

	var _ref;

	var attributes = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
	var children = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
	return _ref = {
		// on utilise la notation raccourcie pour la création d'objets littéraux
		// les parenthèses autour de l'objet littéral permettent au navigateur
		// de savoir qu'il s'agit d'une valeur de retour de type objet littéral
		// et pas d'un bloc de code !
		tagName: tagName,
		attributes: attributes,
		children: children
	}, _defineProperty(_ref, Symbol.iterator, function () {
		return {
			i: 0,
			children: this.children,
			next: function next() {
				if (this.i >= this.children.length) {
					return { done: true };
				}
				return { value: this.children[this.i++] };
			}
		};
	}), _defineProperty(_ref, 'getAttributes', regeneratorRuntime.mark(function getAttributes() {
		var attribute;
		return regeneratorRuntime.wrap(function getAttributes$(_context) {
			while (1) {
				switch (_context.prev = _context.next) {
					case 0:
						_context.t0 = regeneratorRuntime.keys(this.attributes);

					case 1:
						if ((_context.t1 = _context.t0()).done) {
							_context.next = 7;
							break;
						}

						attribute = _context.t1.value;
						_context.next = 5;
						return { attribute: attribute, value: getComponentAttribute(this, attribute) };

					case 5:
						_context.next = 1;
						break;

					case 7:
					case 'end':
						return _context.stop();
				}
			}
		}, getAttributes, this);
	})), _ref;
};

/**
 * Ajoute ou remplace un attribut.HTML dans un composant
 * @param {Object} component  composant à modifier
 * @param {String} attribute  Clé de l'attribut à modifier/ajouter
 * @param {String} value valeur de l'attribut
 * @see getComponentAttribute()
 */
var setComponentAttribute = function setComponentAttribute(component, attribute, value) {
	component.attributes[name] = value;
};

/**
 * Récupère la valeur d'un attribut HTML d'un composant
 * @param {Object} component  composant à modifier
 * @param {String} attribute  Clé de l'attribut à récupérer
 * @see setComponentAttribute()
 */
// utilisation d'une arrow function en notation raccourcie
// la partie après la flèche est la valeur de retour
var getComponentAttribute = function getComponentAttribute(component, attribute) {
	return component.attributes[attribute];
};

/**
 * Retourne le code html correspondant au Component et à ses enfants
 * et l'affiche éventuellement dans un élément html.
 * @return {String} code html généré
 * @see renderComponentAttributes()
 * @see renderComponentChildren()
 */
var renderComponent = function renderComponent(component) {
	var element = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

	// utilisation du destructuring pour accéder à une propriété d'un objet
	var tagName = component.tagName;
	// utilisation d'une arrow function

	var html = '<' + tagName + ' ' + renderComponentAttributes(component) + '>\n\t\t\t\t' + renderComponentChildren(component) + '\n\t\t\t</' + tagName + '>';
	if (element instanceof Element) {
		element.innerHTML = html;
	}
	return html;
};

/**
 * Retourne le code html des attributes d'un component.
 * @param      {Object}    component  Le composant dont on doit rendre les attributs
 * @return     {String}  code html des attributs du component
 */
var renderComponentAttributes = function renderComponentAttributes(component) {
	var attributesHTML = [];
	// let étant une déclaration scopée, plus besoin de la déclarer en haut de fonction
	// `attribute` n'existe qu'à l'intérieur du for
	// for ( let attribute in component.attributes ) {
	// 	attributesHTML.push( ` ${attribute}="${component.attributes[ attribute ]}"` );
	// }

	// utilisation de la generator function *getAttributes
	var _iteratorNormalCompletion = true;
	var _didIteratorError = false;
	var _iteratorError = undefined;

	try {
		for (var _iterator = component.getAttributes()[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
			var _ref2 = _step.value;
			var attribute = _ref2.attribute,
			    value = _ref2.value;

			attributesHTML.push(' ' + attribute + '="' + value + '"');
		}
	} catch (err) {
		_didIteratorError = true;
		_iteratorError = err;
	} finally {
		try {
			if (!_iteratorNormalCompletion && _iterator.return) {
				_iterator.return();
			}
		} finally {
			if (_didIteratorError) {
				throw _iteratorError;
			}
		}
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
var renderComponentChildren = function renderComponentChildren(component) {
	var childrenHTML = [];
	var _iteratorNormalCompletion2 = true;
	var _didIteratorError2 = false;
	var _iteratorError2 = undefined;

	try {
		for (var _iterator2 = component[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
			var child = _step2.value;

			childrenHTML.push(typeof child === 'string' ? child : renderComponent(child));
		}
	} catch (err) {
		_didIteratorError2 = true;
		_iteratorError2 = err;
	} finally {
		try {
			if (!_iteratorNormalCompletion2 && _iterator2.return) {
				_iterator2.return();
			}
		} finally {
			if (_didIteratorError2) {
				throw _iteratorError2;
			}
		}
	}

	return childrenHTML.join('');
};

var createButton = function createButton() {
	var label = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'Ne surtout pas cliquer ici';
	var attributes = arguments[1];
	return createComponent('button', attributes, [label]);
};

var createRoundedRedButton = function createRoundedRedButton(label, attributes) {
	// on utilise ici une feature en stage-3 à l'heure actuelle
	// cf. https://github.com/tc39/proposal-object-rest-spread
	var a = _extends({}, attributes, {
		style: 'border-radius: 5px; color: white; background-color: red'
	});
	return createButton(label, a);
};
//# sourceMappingURL=ui-framework.js.map