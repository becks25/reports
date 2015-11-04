app.factory('IncidentReportFactory', function(DS, $http) {
    return DS.defineResource({
        name: 'incident_reports',
        idAttribute: '_id',
        relations: {
            belongsTo: {
                managers: {
                    localKey: 'managerId',
                    localField: 'manager'
                }
            },
            hasMany: {
                staffs: {
                    localKeys: '_staff',
                    localField: 'staff'
                }
            }
        }
    });
}).run(function(IncidentReportFactory) {});