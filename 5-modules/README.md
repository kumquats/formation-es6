# TP - Modules

## Objectifs
Mettre en oeuvre les modules ES6 via webpack. Après un premier hello-world, porter le TP précédent sous la forme de modules.

## Instructions : Hello World
- Initialiser un nouveau projet npm dans un nouveau dossier, puis le configurer pour utiliser Babel, ESLint et Flow (cf. TPs précédents)
- Y installer également `webpack` avec l'option `--save-dev`
- Ajouter un script dans le fichier package.json permettant de lancer plus facilement webpack :
```
"scripts": {
    "build": "webpack"
},
```
- Créer un dossier `js` `à la racine du projet
- Dans ce dossier `js` créer un fichier **helloWorld.js**
    + Créer une fonction **"helloWorld"** permettant d'afficher le message 'Hello world !' dans la console
    + Exportez la fonction
- Toujours dans le dossier `js`, créer un fichier **app.js**
    + Importer le module `helloWorld` créé précédemment
    + Appeler la fonction retournée par ce module
- A la racine du projet, créer un fichier webpack.config.js
- Définissez le fichier d'entrée à `./js/app.js`
- Faites en sorte que le fichier de sortie soit généré dans `./build/app.bundle.js`
- Faites en sorte que les fichiers js soient compilés via le **babel-loader** tout en excluant le dossier **node_modules**
- Configurer dans le `package.json` la commande `npm run build`
- Créer un fichier `index.html` avec la structure HTML de base
    + Inclure le fichier `./build/app.bundle.js` dans la page
- Tester la page dans le navigateur, le message doit s'afficher dans la console.
- ajouter la gestion des source-maps et tester l'ajout d'un breakpoint dans la fonction helloWorld
- changer le chemin de build de webpack vers `.build/app.bundle.min.js`. Configurer webpack pour minifier et obfusquer le code généré, comparer le poids du fichier `app.bundle.min.js` avec le fichier non minifié `app.bundle.js`


## Instructions : UI Framework & Modules
- repartir de vos fichiers du TP précédent ou bien des fichiers contenus dans ce repository (qui correspondent à la correction du tp précédent !)
- configurer le projet pour le compiler avec webpack et plus directement avec Babel (cf. Instructions HelloWorld)
- Répartir les classes Component, Button et RoundedRedButton dans des modules différents, ne garder dans `ui-framework.js` que les instanciations et les appels aux méthodes render();