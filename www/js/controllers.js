angular.module('starter.controllers', [])

    .controller('DashCtrl', function ($scope) {
    })

    .controller('ChatsCtrl', function ($scope, Chats) {
        // With the new view caching in Ionic, Controllers are only called
        // when they are recreated or on app start, instead of every page change.
        // To listen for when this page is active (for example, to refresh data),
        // listen for the $ionicView.enter event:
        //
        //$scope.$on('$ionicView.enter', function(e) {
        //});

        $scope.chats = Chats.all();
        $scope.remove = function (chat) {
            Chats.remove(chat);
        };
    })

    .controller('TabCtrl', function ($scope, $location) {
        $scope.home = function() {
            $location.path('/countries/')
        }
    })
    .controller('CitiesCtrl', function ($scope, $stateParams, Cities, Data) {
        var country = $stateParams.countryID;
        console.log(country);
        Data.success(function (data) {
           var data = data.filter(function(item){
                return item.country == country;
            }).reduce(function(carry, item) {
               if (!carry.cities) carry.cities = {};
               if (!carry.cities[item._id] && item.name) carry.cities[item._id] = { name : item.name, id : item._id };
               return carry;
           });
           $scope.cities = data.cities;
           $scope.country = country;
        });
    })
    .controller('CountriesCtrl', function ($scope, $stateParams, $http, Cities, Settings, Data) {
        Data.success(function (data) {
            countriesAbwords = data.reduce(function(carry, item) {
                if (!carry.abbswords) carry.abbswords = {};
                if (!carry.abbswords[item.country] && item.country) carry.abbswords[item.country] = item.country;
                return carry;
            });
            $scope.countries = countriesAbwords.abbswords;
        });
    })
    .controller('CityDetailCtrl', function ($scope, $stateParams, $http, Cities, Settings, Data) {
        var cityID = $stateParams.cityID;
        $http({
            method: 'GET',
            url: 'http://api.openweathermap.org/data/2.5/forecast?id=' + cityID + '&APPID=' + Settings.getApiKey()
        }).then(function successCallback(response) {
            if (response.status == 200) {
                console.log(response.data);
                $scope.data = response.data;
            }
            // this callback will be called asynchronously
            // when the response is available
        }, function errorCallback(response) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.
        });
    })

    .controller('AccountCtrl', function ($scope) {
        $scope.settings = {
            enableFriends: true
        };
    });
