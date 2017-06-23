# TP - Modules

## Objectifs
Mettre en oeuvre les modules ES6 via webpack. Après un premier hello-world, porter le TP précédent sous la forme de modules.

## Instructions : Hello World
1. Initialiser un nouveau projet npm dans un nouveau dossier, puis le configurer pour utiliser Babel, ESLint et Flow (cf. TPs précédents)
2. Y installer également `webpack` avec l'option `--save-dev`
3. Ajouter un script dans le fichier package.json permettant de lancer plus facilement webpack :
    ```
    "scripts": {
        "build": "webpack"
    },
    ```
4. Créer un dossier `src` `à la racine du projet
5. Dans ce dossier `src` créer un fichier **helloWorld.js**
    + Créer une fonction **"helloWorld"** permettant d'afficher le message 'Hello world !' dans la console
    + Exportez la fonction
6. Toujours dans le dossier `src`, créer un fichier **app.js**
    + Importer le module `helloWorld` créé précédemment
    + Appeler la fonction retournée par ce module
7. A la racine du projet, créer un fichier webpack.config.js en suivant [la documentation](https://webpack.js.org/concepts/)
8. Définissez le fichier d'entrée à `./src/app.js`
9. Faites en sorte que le fichier de sortie soit généré dans `./build/app.bundle.js`
10. Faites en sorte que les fichiers js soient compilés via le **babel-loader** tout en excluant le dossier **node_modules**
11. Créer un fichier `index.html` avec la structure HTML de base
    + Inclure le fichier `./build/app.bundle.js` dans la page
12. Tester la page dans le navigateur, le message doit s'afficher dans la console.
13. ajouter la gestion des source-maps et tester l'ajout d'un breakpoint dans la fonction helloWorld
14. changer le chemin de build de webpack vers `.build/app.bundle.min.js`. Configurer webpack pour [minifier et obfusquer](https://webpack.js.org/guides/production/) le code généré, comparer le poids du fichier `app.bundle.min.js` avec le fichier non minifié `app.bundle.js`
15. configurer eslint, pour supporter l'utilisation des modules en ajoutant au fichier .eslintrc.js :
    ```
    "parserOptions": {
        "sourceType": "module"
    },
    ```

## Instructions : UI Framework & Modules

1. Repartir de vos fichiers du TP précédent ou bien des fichiers contenus dans ce repository (qui correspondent à la correction du tp précédent !)
2. Configurer le projet pour le compiler avec webpack et non plus directement avec Babel (cf. Instructions HelloWorld)
3. Retirer la balise script de `babel-polyfill` du fichier index.html (on ne garde plus que la balise script de notre application) puis configure webpack pour utiliser `babel-polyfill` cf. https://babeljs.io/docs/usage/polyfill/
4. Répartir les classes Component, Button et RoundedRedButton dans des modules différents, ne garder dans `ui-framework.js` que les instanciations et les appels aux méthodes render();