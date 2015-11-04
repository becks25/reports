app.factory('StaffFactory', function(DS, $http) {
    return DS.defineResource({
        name: 'staff',
        idAttribute: '_id'
    });
}).run(function(StaffFactory) {});