var pokeApp = angular.module('pokedex', []);

// -------------------------------------------------
// Directives
// -------------------------------------------------
pokeApp.directive('research', function() {
    return { templateUrl: 'templates/research.html' };
});


// -------------------------------------------------
// Utilities
// -------------------------------------------------

// L'URL pour accéder à l'API fournissant la liste Pokémon
var pokeApiUrl = "http://pokeapi.co/";

// loader p tag
var $loader = $('p#p_loader');

// input ID field
var $inputIDField = $("input#id");

// La div qui contient les informations concernant le Pokémon sélectionné
var pokeInfoResult = $("#pokeInfoResult");

// Conversion pour avoir des données en français
function getRealWeight(weight) { return weight / 10; }
function getRealHeight(height) { return height * 10; }


// -------------------------------------------------
// Services
// -------------------------------------------------
pokeApp.service('getPokemonInfoSrv', function($http, $q)
{
    this.getPoke = function( IDGiven )
    {
        // URI pour obtenir les informations sur les pokémons
        var pokeApiUrlPoke = pokeApiUrl + "api/v2/pokemon/" + IDGiven;

        // la fonction defer est utile pour obtenir des résultats synchrones
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


// -------------------------------------------------
// Controllers
// -------------------------------------------------
pokeApp.controller('SearchCtrl', function( $scope, $http, $log, getPokemonInfoSrv )
{
    // Effacez le champ ID s'il n'est pas vide (juste pour être sûr)
    $inputIDField.val('');

    // Cacher la div inutile par défaut - Nettoyer l'interface
    pokeInfoResult.hide();

    // Désactiver le bouton Go
    $("#btn_go").addClass("disabled");

    var pokeApiUrlListTotal = pokeApiUrl + "api/v2/pokedex/1/";
    $log.log("LOG : CONTROLLER : URL fournissant la liste des pokémons : " + pokeApiUrlListTotal);

    // Obtenir la liste de tous les Pokémons
    $http({
        method: 'GET',
        url: pokeApiUrlListTotal
    }).then(function successCallback(response)
    {
        $log.log("LOG : CONTROLLER : LES POKÉMOOOOOONS !");
        $scope.data = {
            // Pour afficher le nom du pokémon sélectionné
            selectedPoke: null,
            // Pour fournir la liste des pokémons
            pokemons: response.data.pokemon_entries
        };

        // masqué le loader
        $loader.hide();

        // Activer le bouton Go
        $("#btn_go").removeClass("disabled");
    });

    // Effacer l'entrée du filtre après un clic sur la croix - Masquer la croix après
    $scope.clear = function() {

        // Vide le contenu d'input
        $("input#filter").val('');
        $("span#clear").addClass("hidden");

    };

    // Afficher la croix s'il y a quelque chose d'effaçable
    $scope.displayTheCross = function() {

        console.log("log appel");

        // Si le champ de filtrage n'est pas vide
        if( $("input#filter").val().length > 0 )
        {
            // Montre la croix
            $("span#clear").removeClass("hidden");
        }

    };

    // Modifiez la valeur dans le champ d'ID d'input par la nouvelle sélectionnée
    $scope.onChangeOption = function () {

        // Obtenez la valeur de l'ID du Pokémon
        var optionSelected = $("select#pokemonList option:selected").val();

        // Ajouter cette valeur dans l'input ID
        $inputIDField.val(optionSelected);

        // Recherchez les informations concernant le nouveau Pokémon
        // Équivalent du service watch
        $scope.go();

    };


    // Exécutez une recherche dans la base de données sur un Pokémon en particulier
    $scope.go = function () {

        // Cacher la div contenant le résultat
         // Cacher le début de chaque demande et le montrer lorsque la demande est correcte
        pokeInfoResult.hide();

        // Obtenir l'identité donnée par l'utilisateur (JQuery Powaaa)
        var IDGiven = $inputIDField.val();
        $log.info("INFO : CONTROLLER : Vous avez sélectionné " + IDGiven + "? A sa conquête !");

        if( IDGiven.length > 0 )
        {
            // Désactiver le bouton Go
            $("#btn_go").addClass("disabled");

            // affiche le loader
            $loader.show();

            // Appel au service
            this.getPoke = getPokemonInfoSrv
                .getPoke(IDGiven)
                .then(function (response) {

                    // Log it
                    $log.log("LOG : CONTROLLER : GO : Informations récupérées.");

                    // masquer loader
                    $loader.hide();

                    // Montre la div contenant le résultat
                    pokeInfoResult.show();

                    // retour des données
                    return $scope.poke = {
                        "ID": response.id + " ème Pokémon de votre Pokédex  !",
                        "Nom": response.name,
                        "XP": response.base_experience + " points d'expérience",
                        "Taille": getRealHeight(response.height) + " cm",
                        "Poids": getRealWeight(response.weight) + " kg"
                    };
                })
                .catch(function (response) {
                    $log.error("ERROR : CONTROLLER : GO : Ta MasterBall a échouée et t'a envoyée un message : " + JSON.stringify(response));

                    return $scope.poke = {
                        "Error": "Erreur lors de la récupération des informations. Consultez les logs pour plus d'informations (CTRL + MAJ + I)"
                    };
                });

            // Activer le bouton Go
            $("#btn_go").removeClass("disabled");
        }
        else
        {
            alert("Sélectionne un pokemon d'abord")
        }
    };
});
