app.factory('SuggestionsFactory', function(DS, $http) {
    return DS.defineResource({
        name: 'suggestions',
        idAttribute: '_id',
        relations: {
            belongsTo: {
                managers: {
                    localKey: 'managerId',
                    localField: 'manager'
                }
            }
        }
    });
}).run(function(SuggestionsFactory) {});