
// use strict reste nécessaire en es6+ sauf dnas les classes et les modules
// où il est implicite
'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Component = function () {

	/**
  * Fonction permettant d'initialiser un objet littéral component.
  * Permet de l'initialiser avec son tagName, une liste d'attributs et des enfants.
  * @param  {String} tagName    Nom de la balise html à générer
  * @param  {Object} attributes Liste des attributs html à ajouter sous la forme de paires clé:valeur
  * @param  {Array}  children   Liste des enfants du composant. Chaque enfant peut être un autre component ou une String.
  */
	function Component() {
		var tagName = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'div';
		var attributes = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
		var children = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];

		_classCallCheck(this, Component);

		this.tagName = 'div';
		this.attributes = {};
		this.children = [];

		// on utilise les valeurs par défaut d'ES6 pour les paramètres de la méthode
		this.tagName = tagName;
		this.attributes = attributes;
		this.children = children;
	}

	/**
  * Récupère la valeur d'un attribut HTML d'un composant
  * @param {String} attribute  Clé de l'attribut à récupérer
  * @return {String} valeur de l'attribut demandé ou undefined si l'attribut n'exite pas
  * @see setComponentAttribute()
  */


	_createClass(Component, [{
		key: 'getAttribute',
		value: function getAttribute(attribute) {
			return this.attributes[attribute];
		}

		// Generator function :

	}, {
		key: 'getAttributes',
		value: regeneratorRuntime.mark(function getAttributes() {
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
							return { attribute: attribute, value: this.getAttribute(attribute) };

						case 5:
							_context.next = 1;
							break;

						case 7:
						case 'end':
							return _context.stop();
					}
				}
			}, getAttributes, this);
		})

		/**
   * Retourne le code html correspondant au Component et à ses enfants
   * et l'affiche éventuellement dans un élément html.
   * @return {String} code html généré
   * @see renderComponentAttributes()
   * @see renderComponentChildren()
   */

	}, {
		key: 'render',
		value: function render() {
			var element = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
			var tagName = this.tagName;


			var html = '<' + tagName + ' ' + this.renderAttributes() + '>\n\t\t\t\t\t' + this.renderChildren() + '\n\t\t\t\t</' + tagName + '>';
			if (element instanceof Element) {
				element.innerHTML = html;
			}
			return html;
		}

		/**
   * Retourne le code html des attributes d'un component.
   * @param      {Object}    component  Le composant dont on doit rendre les attributs
   * @return     {String}  code html des attributs du component
   */

	}, {
		key: 'renderAttributes',
		value: function renderAttributes() {
			var attributesHTML = [];
			// utilisation de la generator function *getAttributes
			var _iteratorNormalCompletion = true;
			var _didIteratorError = false;
			var _iteratorError = undefined;

			try {
				for (var _iterator = this.getAttributes()[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
					var _ref = _step.value;
					var attribute = _ref.attribute,
					    value = _ref.value;

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
		}
	}, {
		key: 'renderChildren',
		value: function renderChildren() {
			var childrenHTML = [];
			// utilisation de l'iterator
			// $FlowFixMe
			var _iteratorNormalCompletion2 = true;
			var _didIteratorError2 = false;
			var _iteratorError2 = undefined;

			try {
				for (var _iterator2 = this[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
					var child = _step2.value;

					// on utilise désormais l'opérateur instanceof avec la classe Component
					// plus sur que de tester si ce n'est pas une chaine pour appeler
					// la méthode render()
					childrenHTML.push(child instanceof Component ? child.render() : child);
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
		}

		// $FlowFixMe

	}, {
		key: Symbol.iterator,
		value: function value() {
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
		}
	}]);

	return Component;
}();

var Button = function (_Component) {
	_inherits(Button, _Component);

	function Button() {
		var label = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'Ne surtout pas cliquer ici';
		var attributes = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

		_classCallCheck(this, Button);

		return _possibleConstructorReturn(this, (Button.__proto__ || Object.getPrototypeOf(Button)).call(this, 'button', attributes, [label]));
	}

	return Button;
}(Component);

var RoundedRedButton = function (_Button) {
	_inherits(RoundedRedButton, _Button);

	function RoundedRedButton(label, attributes) {
		_classCallCheck(this, RoundedRedButton);

		return _possibleConstructorReturn(this, (RoundedRedButton.__proto__ || Object.getPrototypeOf(RoundedRedButton)).call(this, label, _extends({}, attributes, {
			style: 'border-radius: 5px; color: white; background-color: red'
		})));
	}

	return RoundedRedButton;
}(Button);

var component = new Component('div', { style: 'border: 1px solid black' }, [new Component('h3', {}, ['Test du ', new Component('strong', { style: 'color: blue' }, ['framework']), ' ui']), new Component('input', { type: 'text', value: 'Ca a l\'air de fonctionner correctement', style: 'width: 500px' })]);
component.render(document.querySelector('#component-container'));

var button = new Button('Ceci est un bouton');
button.render(document.querySelector('#button-container'));

var roundedRedButton = new RoundedRedButton('Ceci est un bouton rouge arrondi', { onclick: 'alert(\'au secours, on me clique dessus !\')' });
roundedRedButton.render(document.querySelector('#rounded-red-button-container'));
//# sourceMappingURL=ui-framework.js.map