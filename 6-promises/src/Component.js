// @flow

export default class Component {

	tagName = 'div';
	attributes:{} = {};
	children:Array<string|Component> = [];

	/**
	 * Fonction permettant d'initialiser un objet littéral component.
	 * Permet de l'initialiser avec son tagName, une liste d'attributs et des enfants.
	 * @param  {String} tagName    Nom de la balise html à générer
	 * @param  {Object} attributes Liste des attributs html à ajouter sous la forme de paires clé:valeur
	 * @param  {Array}  children   Liste des enfants du composant. Chaque enfant peut être un autre component ou une String.
	 */
	constructor( tagName:string = 'div', attributes:{} = {}, children:Array<string|Component> = [] ) {
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
	getAttribute( attribute:string ):string {
		return this.attributes[ attribute ];
	}

	// Generator function :
	*getAttributes() {
		for (const attribute:string in this.attributes){
			yield { attribute, value: this.getAttribute( attribute ) };
		}
	}

	/**
	 * Retourne le code html correspondant au Component et à ses enfants
	 * et l'affiche éventuellement dans un élément html.
	 * @return {String} code html généré
	 * @see renderComponentAttributes()
	 * @see renderComponentChildren()
	 */
	render( element:?Element = null ):string {
		const {tagName} = this;

		const html:string = `<${tagName} ${this.renderAttributes()}>
					${this.renderChildren()}
				</${tagName}>`;
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
	renderAttributes():string {
		const attributesHTML:Array<string> = [];
		// utilisation de la generator function *getAttributes
		for ( const {attribute, value} of this.getAttributes() ) {
			attributesHTML.push( ` ${attribute}="${value}"` );
		}
		return attributesHTML.join('');
	}

	renderChildren():string {
		const childrenHTML:Array<string> = [];
		// utilisation de l'iterator
		// $FlowFixMe
		for ( const child of this ){
			// on utilise désormais l'opérateur instanceof avec la classe Component
			// plus sur que de tester si ce n'est pas une chaine pour appeler
			// la méthode render()
			childrenHTML.push( child instanceof Component ? child.render() : child );
		}
		return childrenHTML.join('');
	}

	// $FlowFixMe
	[Symbol.iterator]() {
		return {
			i: 0,
			children: this.children,
			next() {
				if (this.i >= this.children.length) {
					return { done: true };
				}
				return {value:this.children[ this.i++ ]};
			},
		};
	}
}
