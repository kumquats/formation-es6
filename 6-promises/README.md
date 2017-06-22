# TP Nouveautés ES6: Promise

## Objectifs
Manipuler les Promises à travers une application permettant récupérer des informations météorologiques et une liste de logements airbnb correpsondant à une ville choisie par l'utilisateur.  

## Préparatifs
- repartir de vos fichiers du TP précédent ou bien des fichiers contenus dans ce repository (qui correspondent à la correction du tp précédent !)
- Noter que de nouveaux fichiers `app.html` et `src/app.js` sont présents. C'est dans ces fichiers que l'on va coder pour ce tp.
- Installer le polyfill fetch (https://github.com/github/fetch#installation)
    Exemple d'utilisation de fetch
    ```js
    fetch('https://monsite.com/api/webservice').then(function(response) { 
        // Conversion en JSON
        return response.json();
    }).then(function(data) {
        // Data est un objet javascript
        console.log(data); 
    });
    ```
- Consulter la documentation de l'API météo (http://openweathermap.org/weather-data)


## Instructions

1. Créer une fonction **getWeatherByPlace**
    + Prend la ville sélectionnée en paramètre
    + Permet de récupérer la météo d'une ville
    + Utilise le webservice **http://api.openweathermap.org/data/2.5/weather?q={ville}&appid=851b41b99f54374d348017676b74fd02**
    + Retourne la promise générée par fetch
2. Créer une fonction **getAirbnbByPlace**
    + Prend la ville sélectionnée en paramètre
    + Permet de récupérer les logements d'une ville
    + Utilise le webservice **proxy.php?location={ville}**
    + Retourne la promise générée par fetch
3. Créer une fonction **convertKelvinToCelsius**
    + Prend une température en degré Kelvin en paramètre
    + Permet de convertir les degrés Kelvin en Celsius
    + Utilise le webservice **temperature.php?temperature={temperature_en_kelvin}**
    + Retourne la promise générée par fetch
4. A la soumission du formulaire
    + Appeler simultanément les fonctions **getWeatherByPlace** et **getAirbnbByPlace**
    + Lorsque l'appel à **getWeatherByPlace** est terminé, appeler la fonction **convertKelvinToCelsius** 
    + Attendre le résultat des deux webservices grâce à **Promise.all()**
    + Lorsque les webservices ont répondu
        * Convertir la température en degré celsius grâce à la fonction **convertKelvinToCelsius**
        * Générer l'affichage de la météo (température, vitesse du vent, humidité)
        * Afficher une icône adaptée en fonction du temps (images/meteo)
        * Générer l'affichage des Airbnb (nom, photo, note) à l'aide de la classe Component.


## Pour aller plus loin
- Créer une classe `SearchForm` héritée de Component et qui gère l'affichage du formulaire et des résultats en remplacement des fonctions écrites précédemment.
- Créer un composant `Loading` affiché dans le formulaire pendant la durée de chargement des Promises
- Afficher les résultats à l'aide de classes héritées de Component : un composant Meteo qui affiche les infos de météo, un composant List dans lequel sont rendus des composants Airbnb (qui correspondent aux logements en location retournés par le webservice)
<!--
classe form extends component : remplacer fonctions par méthodes de la classe (
render(element){
    if ( this.element ) {
        this.element.removeEventListener('submit', this.handleSubmit ); 
    }
    this.element = element;
    this.element.addEventListener('submit', this.handleSubmit );
    super.render( element );
}

promises : chainage converttocelsius plutôt sur getweather que sur promise.all

-->

