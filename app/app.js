/*
//  Author  : Aghilesh T
//  Date    : 29-Mar-2017  
*/

// Angular Module defined
var petApp = angular.module('petInfo', []);

//API URL constant
petApp.constant('API_URL', 'http://agl-developer-test.azurewebsites.net/people.json');

//Angular controller definition
petApp.controller('PetInfoController', function PetInfoController($http, petService) {
    var _this = this;
   _this.petsData = {};

    //Get and process pet information
    _this.loadPetDetails = function loadPetDetails() {
        petService.getPets().then(function (response) {
            if (response.data && Array.isArray(response.data) && response.data.length) {
                response.data.forEach(function (owner) {
                    if (Array.isArray(owner.pets) && owner.pets.length) {
                        if (owner.gender) {
                            if (!_this.petsData[owner.gender]) {
                                _this.petsData[owner.gender] = [];
                            }
                            _this.petsData[owner.gender] = _this.petsData[owner.gender].concat(_this.filterPets(owner.pets, 'Cat'));
                        }
                    }
                });
            }
        });
    };

    //Filters pets based on type, returns array
    _this.filterPets = function filterPets(pets, type) {
        var filteredPets = [];
        pets.forEach(function (pet) {
            if (type == pet.type) {
                filteredPets.push(pet);
            }
        });
        return filteredPets;
    };

    // initialise the data loading..
    _this.loadPetDetails();
});

// API Call to get pet information
petApp.factory('petService', function petService($http, API_URL) {
    return {
        getPets: function () {
            return $http.get(API_URL);
        }
    }
});