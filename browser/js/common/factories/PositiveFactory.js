app.factory('PositiveFactory', function(DS, $http) {
    return DS.defineResource({
        name: 'positive',
        idAttribute: '_id'
    });
}).run(function(PositiveFactory) {});