# TP - Support Navigateur & outils

## Objectifs
Mettre en place un environnement de développement permettant de compiler le code ES6 en ES5, de gérer le typage et de linter les erreurs.

## Menu
- [Préparatifs](#préparatifs)
- [Instructions : Babel](#instructions--babel)
- [Instructions : Flow](#instructions--flow)
- [Instructions : ESLint](#instructions--eslint)


## Préparatifs
- Télécharger et installer la version 8.*.* de NodeJS : http://nodejs.org/
- repartir de vos fichiers du TP précédent ou bien des fichiers contenus dans ce repository (qui correspondent à la correction du tp précédent !)
- dans chrome, **désactiver** le support des features ECMAScript expérimentales. Ouvrir un onglet sur `chrome://flags` et dans cette page rechercher et **désactiver** la clé **"Experimental JavaScript"** (nécessite un redémarrage de chrome).

## Instructions : Babel
1. Initialiser npm à la racine du dossier du projet. Lancer la commande :
	```bash
	npm init
	```
	Un questionnaire vous sera posé. Laissez les options par défaut.

2. Installer Babel
	```bash
	npm install --save-dev babel-cli babel-loader babel-core 
	```
	Constater dans le fichier `package.json` créé par `npm init` que les packages que l'on vient d'installer sont ajoutés dans `devDependencies`

3. renommer le dossier `js` en `src` puis compiler le JS à l'aide de Babel CLI :
	```
	.\node_modules\\.bin\babel src -d build 
	```
   Corriger le code du fichier index.html pour qu'il utilise le fichier généré dans le dossier `'build'` plutôt que le fichier de l'ancien dossier `'js'`.
   Constater que le fichier généré par Babel n'est pas transpilé mais reste intact :grimacing:

4. Activer la transpilation en ajoutant le preset `'env'` au projet. Ce preset contient les presets ES2015, ES206 et ES2017.
	```
	npm install --save-dev babel-preset-env
	```
	Ajouter un fichier `.babelrc` à la racine du dossier (au même niveau que le `package.json` donc) et y placer le code suivant :
	```json
	{
	  "presets": ["env"]
	}
	```
	Recompiler l'application et constater la transpilation en ES5.

5. La tranpilation avec le preset `'env'` fonctionne sauf pour les features en stage < 4. Pour transpiler l'intégralité des features ESNext, il faut utiliser les presets correspondant au stage voulu. Pour supporter la feature [Object rest spread transform](https://babeljs.io/docs/plugins/transform-object-rest-spread/) il faut ajouter le preset [stage-3](https://babeljs.io/docs/plugins/preset-stage-3/) et recompiler :
	```bash
	npm install --save-dev babel-preset-stage-3
	```
	.babelrc :
	```json
	{
	  "presets": ["env", "stage-3"]
	}
	```

6. Pour le support des generators, ajouter le plugin [babel-polyfill](https://babeljs.io/docs/usage/polyfill/) (noter le `--save` et pas `--save-dev`) :
	```sh
	npm install --save babel-polyfill
	```

7. Pour simplifier la compilation, ajouter une commande npm qui va servir de "raccourci" pour la commande babel : modifier le fichier `'package.json'` et modifier la clé "scripts" comme suit :
	```json
	"scripts": {
	  
	  "build": "babel src -d build"
	},
	```
	Compiler ensuite l'application en lançant la commande
	```bash
	npm run build
	```

8. A l'aide de la [documentation de babel](https://babeljs.io/docs/usage/cli/), ajouter une commande `npm run watch` qui permettra de lancer la compilation dès qu'une modification sera apportée à un fichier du dossier '`src`'. Ajouter aux deux commande (`build` et `watch`) le support des source-maps.

## Instructions : Flow

9. Installer et configurer Flow, ajouter le preset babel flow
	```bash
	npm install --save-dev babel-preset-flow flow-bin
	```
	.babelrc :
	```json
	{
	  "presets": ["env", "stage-3", "flow"]
	}
	```
	ajouter un script au `package.json` :
	```json
	"scripts": {
	  "flow": "flow"
	}
	```
	Initialiser Flow :
	```bash
	npm run flow init
	```

10. Ajouter des informations de typage aux paramètres des fonctions , aux valeurs de retour et à toutes les variables du code. Tester le typage avec la commande :
	```bash
	npm run flow
	```
	Si tout est valide du premier coup (on peut toujours rêver :stuck_out_tongue_winking_eye:) afin de s'assurer que le typage fonctionne correctement, tentez de faire une affectation incorrecte dans votre code et de relancer flow.
<!--

## Instructions : ESLint

11. 

????
Flow comments https://babeljs.io/docs/plugins/transform-flow-comments/ ? 
"build": "eslint & flow & babel src -d build" ?
flow plugin ?



## Objectifs 

L'objectif de ce TP est de mettre en place Babel, de compiler un projet, et d'installer les outils nécessaires.

## Préparatifs 

- Lancer cette commande à la racine du projet et laisser les configurations par défaut
```sh
npm init
```

## Instructions 

1. Mise en place de Babel

	1. Installation de Babel

	2. Votre fichier package.json doit ressembler à ça
```json
{
  "name": "tp-flow",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
	"test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "",
  "license": "ISC",
  "devDependencies": {
	"babel-cli": "^6.24.1",
	"babel-core": "^6.25.0",
	"babel-loader": "^7.0.0",
  }
}
```

	2. Création du fichier .babelrc à la racine du projet

	3. Installation Presets
		
		1. 
		```sh
		npm install --save-dev babel-cli babel-preset-es2015
		```
		2. Dans le fichier .babelrc
		```sh
		{
			// Permet d'activer la compilation du code ES6
			"presets": ["es2015"]
		}
		```

	4. Installation du plugin syntax-flow 
		
		1. 
		```sh
		npm install --save-dev babel-plugin-syntax-flow
		```
		2. A rajouter dans le fichier.babelrc
		```sh
		{
		  "plugins": ["syntax-flow"]
		}
		```

	5. Installation de Polyfill
	```sh
	npm install --save-dev babel-polyfill
	```

	6. Build (Compilation du TP précédent)
		1. Créer un dossier src à la racine du projet
		2. Créer dans src un fichier index.js contenant du js
		3. Créer un dossier build à la racine du projet 
		4. rajouter la commande de build dans le package.json comme ceci:
```json
{
	"name": "my-project",
	"version": "1.0.0",
	"scripts": {
+     "build": "./node_modules/.bin/babel src -d build"
	},
	"devDependencies": {
	  "babel-cli": "^6.0.0"
	}
  }
```
		5. Maintenant dans le terminal on peut donc compilé l'appli
```sh
npm run build
```

2. Ajouter Flow

	1. Installation

	```sh
	npm install --save-dev babel-cli babel-preset-flow
	```

	2. Ajout dans le fichier .babelrc
	
	```sh
	{
		"presets": ["flow"]
	}
	```

	3. Compilation
		1. Modifiez le fichier index.js pour utiliser le code suivant
		```js
		// @flow
		// la ligne ci-dessus est nécessaire pour que Flow teste le fichier

		// On spécifie ici que la variable a est un string à la quelle on 
		// donne la valeur 12
		let a:string = 12;
		```

		2. Cette fois-ci dans le package.json on modifie la commande build
		```json
		"build": "babel src/ -d build/"
		```

3. Installation Sublime Text ESLint
	
	1. Installation
```bash
npm install -g eslint
```
	2. Lancer la commande et vous obtiendrez un fichier .eslintrc
```bash
eslint --init
```

	3. Modifiez le fichier index.js de cette façon
```js
let c = ;
```

	4. On peut donc lancer ESLint grâce à cette commande
```sh
eslint src/index.js
```
-->