app.factory('InfractionReportFactory', function(DS, $http) {
    return DS.defineResource({
        name: 'infraction_reports',
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
}).run(function(InfractionReportFactory) {});