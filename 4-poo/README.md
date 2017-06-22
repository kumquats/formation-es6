# TP - POO

## Objectifs
Mettre en pratique la nouvelle syntaxe de la programmation orientée objet en ES6. Convertir le précédent TP à la POO.

## Préparatifs
- repartir de vos fichiers du TP précédent ou bien des fichiers contenus dans ce repository (qui correspondent à la correction du tp précédent !)
- pour utiliser la [déclaration de variables dans la classe](https://tc39.github.io/proposal-class-fields/, installer et configurer babel pour utiliser le stage-2

## Instructions
1. Créer une classe "Component" qui viendra en remplacement de la fonction createComponent().
2. Remplacer le code utilisant la fonction createComponent par l'instanciation de la classe Component.
3. Remplacer les fonction createButton et createRoundedRedButton par des classes Button et RoundedRedButton.

**NB:** *en cas d'utilisation des Iterators, la vérification du code avec Flow peut poser problème : dans ce cas ajouter les commentaire suivant sur la ligne juste au dessus de la déclaration de l'iterator et du for-of qui l'utilise :*
```
// $FlowFixMe
```


## Pour aller plus loin
- Remplacer l'objet attributes par une Map
- Remplacer le tableau children par un Set
- Ajouter des méthodes statiques createDiv, createLink et createImg dans la classe component permettant d'instancier un component dont la balise est préconfigurée (factory).

