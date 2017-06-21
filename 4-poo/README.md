# TP - POO

## Objectifs
Mettre en pratique la nouvelle syntaxe de la programmation orientée objet en ES6. Convertir le précédent TP à la POO.

## Préparatifs
- repartir de vos fichiers du TP précédent ou bien des fichiers contenus dans ce repository (qui correspondent à la correction du tp précédent !)

## Instructions
- Créer une classe "Component" qui représentera un composant graphique générique
    + Le constructeur de la classe **Component** doit prendre 3 paramètres:
        * **tagName** (string): Le nom du tag HTML
        * **attributes** (objet): Liste des attributs HTML du composant
        * **children** (array): Liste des enfant du composant. Peut contenir d'autres instances de **Component** ou de simples string
    + La classe devra implémenter les méthodes suivantes
        * **setAttribute(name, value)** : Permet de modifier/ajouter un attribut
        * **getAttribute(name)** : Permet de récupérer la valeur d'un attribut
        * **getTagName()** : Permet de récupérer le tag du composant HTML
        * **render()**: Retourne le code HTML du composant en chaine de caractère en fonction du **tagName**, des **attributes** et des **children**. Cette méthode doit s'appuyer sur la méthode **renderChildren()** décrite ci-dessous
        * **renderChildren()**: Retourne le HTML des composants enfants concaténés dans une seule string
- Créer une classe **Button** qui hérite de **Component**
    + Le constructeur de la classe doit prendre 2 paramètres:
        * **text** : Texte à afficher dans le bouton
        * **attributes** : Attributs du bouton
    + Par défaut cette classe doit générer un 'button' HTML contenant le texte et les attributs définis dans le constructeur
- Créer une classe **RoundedRedButton** qui hérite de **Button**
    + Le constructeur de la classe doit prendre 2 paramètres:
        * **text** : Texte à afficher dans le bouton
        * **attributes** : Attributs du bouton
    + Par défaut cette classe doit afficher un 'button' HTML contenant le texte et les attributs définis dans le constructeur **ET** possédant des coins arrondis, une couleur de texte blanche et une couleur de fond rouge
