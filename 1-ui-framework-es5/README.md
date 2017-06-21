# TP - ui framework ES5

## Objectifs
Développer un micro framework ui permettant de manipuler le code html de la page.
Le code HTML fourni contient des appels à différentes fonctions que vous devrez implémenter. Seul le code JavaScript pourra être modifié, la page HTML ne peut pas être changée !

## Préparatifs
- installer un serveur apache/php (sur windows [Apachefriends xampp](https://www.apachefriends.org/fr/index.html) ou [wampserver](http://www.wampserver.com/))
- dans l'arborescence du serveur apache (dossier www ou htdocs) créer un sous-dossier pour le projet et y placer le contenu de ce repo

## Instructions
L'ensemble du TP devra être réalisé en mode strict.
1. implémenter la fonction createComponent(tagName, attributes, children). Cette fonction doit retourner un objet de la forme : 
    ```js
    {
        tagName: '...',
        attributes: {...},
        children: [...]
    }
    ```
2. Implémenter les fonctions setComponentAttribute( component, name, value ) et getComponentAttribute( component, name )
3. Implémenter la fonction renderComponent( component, element ). Cette fonction calcule le code html correspondant au component passé en paramètre. Ce code html est soit injecté dans l'élément passé en paramètre soit retourné sous forme de chaine de caractère si aucun élément n'est passé. 
La fonction renderComponent() s'appuiera sur deux fonctions : renderComponentAttributes( component ) et renderComponentChildren( component ) qui retournent le code html respectivement des attributs et des enfants du composant.
4. Implémenter deux méthodes createButton() et createRoundedRedButton() qui permettent de rendre des components spécifiques (cf. code html fourni pour la signature des fonctions).
