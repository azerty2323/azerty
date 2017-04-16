# Pokédex & AngularJS

![Pokémons](http://www.zwallpapers.net/data/programs/images/pokemon-2_1920x1080.jpg "Allons tous les trouver !")

Ce TP a été réalisé par le binôme Ghislain JUIMO et Souleymane SARR dans le cadre des TP du cours de SIR. L'objectif de ce projet était de développer un pokédex en AngularJS en récupérant les informations nécessaires via l'API du site Pokeapi.co.

*Les paragraphes suivants permettent une meilleure compréhension de ce qui a été demandé pendant le TP. Suite à la motivation ressentie par le binôme vis-à-vis du sujet, certains éléments non demandés ont été rajoutés et d'autres retirés au fur et à mesure du développement pour améliorer le design de l'application ou pour nettoyer le code de fonctionnalités inutiles. Afin de profiter pleinement de l'expérience, nous vous proposons de tirer le projet en lançant la commande :*

                   

## Fonctionnement de l'application



Lors de l'arrivée sur la page d'accueil de l'application, un message apparaît afin de prévenir l'utilisateur qu'une requête est en cours (celle qui récupère la liste de tous les pokémons). Une fois la requête terminée, le message disparaît. Vous verrez un champ texte au centre de l'image vous permettant de saisir le nom ou l'ID du pokémon qui vous intéresse si toutefois vous le connaissez. Si vous n'êtes pas sûr de son nom ou si vous voulez vérifier avant de lancer une recherche, utilisez le filtre dans le bandeau supérieur. 

Toute saisie effectuée dans le champ "Filtre" lancera une requête pour récupérer la liste des pokémons correspondant à votre recherche, que ça soit en se basant sur le nom ou sur le numéro. Une fois que votre pokémon apparaît dans la liste à droite du champ texte, sélectionnez le et son nom ira directement se rajouter au champ texte du centre de l'image. La requête se lancera également automatiquement.

## Évolutions du pokédex

### Recherche d'un pokémon via son numéro
#### Q1. Définition d'une balise `<input>`

```html
<form>
    <div class="form-group col-xs-4">
        <input ng-model="id" name="id" class="form-control input-md" id="id" placeholder="ID du pokémon">
    </div>
</form>
```

#### Q2. Affichage de la valeur de l'ID dans la balise `<input>` précédente

```html
<div class="col-xs-4">
    <pre>Identifiant renseigné = <span ng-bind="id"></span></pre>
</div>
```

### Recherche dans une liste
#### Q3. Création d'un contrôleur et appel depuis la vue

Dans le contrôleur

```javascript
function SearchController($scope, $http)
 {
     // Nouveau controleur
 }
```

et dans la vue

```html
<div class="row">
  Liste des pokémons donnée par l'API :
  <div ng-controller="SearchCtrl">
    <!-- Content -->
  </div>
</div> <!-- end .row -->
```

#### Q4. Ajout manuel d'une variable contenant une liste de pokémons et à injecter dans le $scope


```javascript
pokeApp.controller("ngController1",["$scope", "$log",function($scope, $log){
	//tableau d'objets rendu avec une portée externe via le scope
	$scope.pokemons = [
		{
			id: 1,
			nom: "pickachu"
		},
		{
			id: 2,
			nom: "tortank"
		},
		{
			id: 3,
			nom: "ratata"
		},
		{
			id: 4,
			nom: "salameche"
		},
		{
			id: 5,
			nom: "dragofeu"
		},
	];
	
	$scope.go = function(){
		$log.info($scope.model);
	}
			
}]);
```

#### Q5. Affichage de la liste des pokémons entrés manuellement

```html
<div class="row">
  Liste des pokémons donnée par l'API :
  <select ng-controller="SearchCtrl">
    <option ng-repeat="pokemon in pokemons" value="{{pokemon.name}}">{{pokemon.name}}</option>
  </select> 
</div> <!-- end .row -->
```

#### Q6. Récupération du choix du dresseur en liant la balise `<select>` au modèle *ng-model*

```html
<div class="row" ng-controller="SearchCtrl">
  <label for="pokemonList">Liste des pokémons donnée par l'API :</label>
  <select name="pokemonList" id="pokemonList" ng-model="data.selectedPoke">
    <option ng-repeat="pokemon in data.pokemons" value="{{pokemon.name}}">{{pokemon.name}}</option>
  </select>
  <p>Valeur sélectionnée = {{ data.selectedPoke }}</p>
</div> <!-- end .row -->
```

#### Q7. Ajout d'un filtre

```html
<div class="row-inline">
  <label>Recherche : <input ng-model="searchPoke"></label>
  <label for="pokemonList">Liste des pokémons donnée par l'API :</label>
  <select name="pokemonList" id="pokemonList" ng-model="data.selectedPoke">
    <option ng-repeat="pokemon in data.pokemons | filter:searchPoke" value="{{pokemon.name}}">{{pokemon.name}}</option>
  </select>
  <p>Valeur sélectionnée = {{ data.selectedPoke }}</p>
</div> <!-- end .row -->
```

#### Q8. Ajout d'un bouton à la page

```html
<div class="row">
  <div class="form-group">
    <button class="btn btn-primary pull-right" ng-click="go( data.selectedPoke.id )">Go !</button>
  </div>
</div> <!-- end .row -->
```

#### Q9. Tester la recherche fonctionnelle en logant le nom du pokémon recherché

> Succès !

Nous avons le plaisir de vous laisser tester vous-même le résultat afin de pouvoir vérifier son fonctionnement !


### Accès à une API
#### Q10. Récupération de la liste exhaustive des pokémons via l'API

```javascript
function SearchController($scope, $http)
 {
     console.log("LOG : CONTROLLER : Controller SearchController OK");
 
     var pokeApiUrlListTotal = "http://pokeapi.co/api/v2/pokemon/";
     console.log("LOG : CONTROLLER : URL fournissant la liste des pokémons : " + pokeApiUrlListTotal);
 
     // GET request
     $http({
         method: 'GET',
         url: pokeApiUrlListTotal
     }).then(function successCallback(response) {
         console.log("LOG : CONTROLLER : Requête HTTP réussit avec succès");
         $scope.pokemons = response.data;
     });
 }
 ```

#### Q11. Création d'un service $resource pour accéder aux informations d'un pokémon
```Javascript
pokeApp.factory('ServiceInfo', ['$resource', 'POKEMONAPI', function($resource, POKEMONAPI) {
	return $resource(POKEMONAPI + 'pokemon/:id'); 
}]);
```

#### Q12. Création d'un nouveau contrôleur pour l'affichage des informations concernant un pokémon

Dans notre cas, les appels ont été réalisés dans le même contrôleur. Cela donne le résultat suivant :

```javascript

$scope.go = function () 
{
  var pokeApiUrlPoke = pokeApiUrlListTotal + pokeID;
  // Get the ID given by the user (JQuery Powaaa)
  var IDGiven = $("input#id").val();

  // Show the loader p tag
  $("p#p_loader").show();

  // URI to get the information about the pokemon
  var pokeApiUrlPoke = pokeApiUrl + "api/v2/pokemon/" + IDGiven;
  
  $http({
    method: 'GET',
    url: pokeApiUrlPoke
  }).then(function successCallback(response) {
    console.log("LOG : CONTROLLER : Requête HTTP (information du pokémon) réussit avec succès.");
    $scope.poke = {
      "ID": response.data.id,
      "Nom": response.data.name,
      "Taille": response.data.height,
      "Poids": response.data.weight
    };
    console.log("LOG : CONTROLLER : Information d'un pokémon : " + JSON.stringify(response.data));

    // Hide the loader p tag
    $("p#p_loader").hide();
  });
}
```


### Communication entre contrôleurs
#### Q13. Création d'un service contenant le nom et l'ID du pokémon

```javascript
// -------------------------------------------------
// Services
// -------------------------------------------------
pokeApp.service('getPokemonInfoSrv', function($http, $q)
{
    this.getPoke = function( IDGiven )
    {
        // URI to get the information about the pokemon
        var pokeApiUrlPoke = pokeApiUrl + "api/v2/pokemon/" + IDGiven;

        // The defer function is usefull to have synchronous results
        var deferred = $q.defer();
        $http
            .get(pokeApiUrlPoke)
            .success( function( response, status, headers, config )
            {
                deferred.resolve(response, status, headers, config);
            })
            .error(function (response, status, headers, config) {
                deferred.reject(response, status, headers, config);
            });

        return deferred.promise;
    }
});
```

#### Q14. Utilisation du service $watch pour mettre à jour l'affichage

Non pas que ce soit compliqué à utiliser mais une envie subite d'utiliser du JQuery à motiver à ne pas choisir le service $watch. Dans le cas où nous aurions voulu le faire, il aurait fallu faire quelque chose comme

```javascript
$scope.$watch('stuff_watched', function() {
  // do something here
}, true);
```


### Création d'une directive
#### Q15. Création d'une directive de référence de vues

Dans le fichier pokedex.js

```javascript
// -------------------------------------------------
// Directives
// -------------------------------------------------
pokeApp.directive('pokedex', function() {
    return { templateUrl: 'templates/pokedex.html' };
});
```

Et dans la vue principale

```html
<div pokedex></div>
```

#### Q16. Ajout des sprites (images) des pokémons

```html
<!-- Pokémon information -->
<div id="pokeInfoResult" class="row">
  <p>Voici le Pokémon que vous avez choisi :</p>
  <ul class="list-group col-xs-6 col-xs-offset-2">
    <li>
      <img style="width:30%;"
        src="http://img.pokemondb.net/artwork/{{ poke.Nom }}.jpg"
        class="img-responsive col-xs-offset-6 img-rounded">
    </li>
  </ul>
  <ul class="pokeInfoResultListItem list-group col-xs-6 col-xs-offset-3" ng-repeat="(key, val) in poke">
    <li class="list-group-item list-group-item-info"><b>{{ key }}</b> : {{ val }}</li>
  </ul>
</div> <!-- end .row -->
```
