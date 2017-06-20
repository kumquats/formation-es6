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
	.\node_modules\.bin\babel src -d build 
	```
   Si vous utilisez des features ESNext qui déclenchent une erreur (features pas encore supportées comme les Object rest spread transforms), commentez pour le moment les lignes en question et recompiler.
   
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

5. La tranpilation avec le preset `'env'` fonctionne sauf pour les features en stage < 4. Pour transpiler l'intégralité des features ESNext, il faut utiliser les presets correspondant au stage voulu. Pour supporter la feature [Object rest spread transform](https://babeljs.io/docs/plugins/transform-object-rest-spread/) il faut par exemple ajouter le preset [stage-3](https://babeljs.io/docs/plugins/preset-stage-3/) :
	```bash
	npm install --save-dev babel-preset-stage-3
	```
	.babelrc :
	```json
	{
	  "presets": ["env", "stage-3"]
	}
	```
	Reste à décommenter les lignes commentées au point 3 puis recompiler.
	
6. Pour le support des generators, ajouter le plugin [babel-polyfill](https://babeljs.io/docs/usage/polyfill/) (noter le `--save` et pas `--save-dev`) :
	```sh
	npm install --save babel-polyfill
	```
	Ajouter ensuite le script de babel-polyfill dans le code html de la page (juste avant l'inclusion du fichier `build/ui-framework.js`) :
	```html
	<script src="node_modules/babel-polyfill/dist/polyfill.min.js"></script>
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

8. A l'aide de la [documentation de babel](https://babeljs.io/docs/usage/cli/), ajouter une commande `npm run watch` qui permettra de lancer la compilation dès qu'une modification sera apportée à un fichier du dossier '`src`'. Ajouter aux deux commande (`build` et `watch`) le support des source-maps. Recompiler et inspecter le code dans les devtools de chrome puis mettre un breakpoint dans le fichier js du src, recharger la page et constater que chrome arrête bien l'exécution au bon endroit malgré le fait qu'il exécute la version compilée du JS.

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
	npm run flow --silent
	```
	Si tout est valide du premier coup (on peut toujours rêver :stuck_out_tongue_winking_eye:) afin de s'assurer que le typage fonctionne correctement, tentez de faire une affectation incorrecte dans votre code et de relancer flow.


## Instructions : ESLint

11. Installer et configurer eslint dans le projet :
	```bash
	npm install --save-dev eslint
	```
	package.json: 
	```json
	"scripts":{
		"eslint": "eslint"
	}
	```
	```bash
	npm run eslint -- --init
	```
	Répondre aux questions posées et examiner le fichier .eslintrc.js généré

12. Installer le [plugin flow](https://www.npmjs.com/package/eslint-plugin-flowtype) et le [parser babel](https://www.npmjs.com/package/babel-eslint) (nécessaire pour faire fonctionner le plugin flow, le parser par défaut, espree, [ne supportant pas la syntaxe flow](https://github.com/eslint/espree/issues/278)) pour eslint :
	```bash
	npm install --save-dev eslint-plugin-flowtype babel-eslint
	```
	ajouter dans le fichier .eslintrc.js :
	```
	"parser": "babel-eslint",
	"plugins": ["flowtype"],
	```

13. Tester eslint avec le fichier `src/ui-framework.js` et corriger les erreurs retournées jusqu'à ce que la commande ne retourne plus d'erreurs :
	```bash
	npm run eslint src/ui-framework.js --silent
	```

14. Comme une partie du code JS se trouve dans le document HTML, eslint retourne des erreurs car certaines fonctions ne sont pas utilisées. Déplacer donc le code JS contenu dans la page html vers le fichier ui-framework.js. Commenter les fonctions qui sont effectivement non utilisées.

15. Dans Sublime Text :
	- installer package control
	- lancer la commande (CTRL+SHIFT+P) `Package Control: Install Package` et installer les packages `Babel`, `SublimeLinter`, `SublimeLinter-contrib-eslint` et `SublimeLinter-flow`
	- Editer la configuration de sublimeLinter (User) dans Sublime Text (menu Preferences > Package Settings > SublimeLinter > Settings-User), et si pas déjà présent ajouter : 
	```json
	"syntax_map": {
	  "JavaScript (Babel)": "javascript",
	}
	```
	- Redémarrer Sublime Text, ouvrir le fichier ui-framework.js, modifier pour créer une erreur et constater que l'erreur s'affiche !


