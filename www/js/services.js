angular.module('starter.services', [])
    .factory('Settings', function(){
      var settings = { key: '207ee5f537276eda9dd62a1d735cb4d9 '};
      return {
        getApiKey: function() {
          return settings.key;
        }
      }
    })  .factory('Cities', function ($http) {
    // Might use a resource here that returns a JSON array


    var cities = [{
        id: 705135,
        name: 'Konotop',
        region: 'Sumy Region',
        icon: 'img/705135.jpg',
        data: {}
    }];

    return {
        all: function () {
            return cities;
        },
        get: function (cityId) {
            for (var i = 0; i < cities.length; i++) {
                if (cities[i].id === parseInt(cityId)) {
                    return cities[i];
                }
            }
            return null;
        }
    };
})
    .factory('Data', function($http) {
    return $http.get('/appdata/cities.json');
});
