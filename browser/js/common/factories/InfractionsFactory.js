app.factory('InfractionsFactory', function(DS, $http) {
    return DS.defineResource({
        name: 'infractions',
        idAttribute: '_id'
    });
}).run(function(InfractionsFactory) {});