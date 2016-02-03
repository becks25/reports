app.factory('PositiveReportFactory', function(DS, $http) {
    return DS.defineResource({
        name: 'positive_reports',
        idAttribute: '_id',
        relations: {
            belongsTo: {
                managers: {
                    localKey: 'managerId',
                    localField: 'manager'
                },
                staffs: {
                	localKey: 'staffId',
                	localField: 'staff'
                }
            }
        }
    });
}).run(function(PositiveReportFactory) {});