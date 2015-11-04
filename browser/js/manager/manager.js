app.config(function ($stateProvider) {

    $stateProvider.state('manager', {
        url: '/manager',
        templateUrl: 'js/manager/manager.html',
        controller: 'ManagerCtrl',
        resolve: {
            staff: (StaffFactory) => {
                return StaffFactory.findAll()
                    .then(staff => {
                        var staffArr = [];

                        staff.forEach(employee => {
                            staffArr.push(employee.name);
                        });

                        return staffArr;
                    })
            },
            infractions: (InfractionsFactory) => {
                return InfractionsFactory.findAll()
                    .then(infractions => {
                        var infractionArr = [];

                        infractions.forEach(infraction => {
                            infractionArr.push(infraction.name);
                        });

                        return infractionArr;
                    })
            },
            reports: (IncidentReportFactory, InfractionReportFactory) => {
                return IncidentReportFactory.findAll()
                    .then(incidents => {
                        return InfractionReportFactory.findAll()
                        .then(infractions => {
                            var reportsArr = [];

                            incidents.forEach(incident => {
                                reportsArr.push(incident);
                            });

                            infractions.forEach(infraction => {
                                reportsArr.push(infraction);
                            });

                            return reportsArr;
                        })
                    })
            }
        }
    });

});

app.controller('ManagerCtrl', function ($scope, AuthService, Session, $state, staff, infractions, reports) {
    $scope.user = Session.user;
    $scope.staff = staff;
    $scope.infractions = infractions;
    $scope.reports = reports.filter(report => {
        return report.managerId == $scope.user._id;
    });

});