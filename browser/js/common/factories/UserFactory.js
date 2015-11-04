app.factory('UserFactory', function(DS, $http) {
    return DS.defineResource({
        name: 'users',
        idAttribute: '_id'
    });
}).run(function(UserFactory) {});