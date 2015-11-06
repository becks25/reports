app.config(function ($stateProvider) {

    $stateProvider.state('manager', {
        url: '/manager',
        templateUrl: 'js/manager/manager.html',
        controller: 'ManagerCtrl',
        resolve: {
            staff: (StaffFactory) => {
                return StaffFactory.findAll();
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

app.controller('ManagerCtrl', function ($scope, AuthService, Session, $state, staff, infractions, reports, InfractionReportFactory) {
    $scope.user = Session.user;
    $scope.staff = staff;
    $scope.infractions = infractions;
    $scope.staffNames = [];

    staff.forEach(employee => {
        $scope.staffNames.push(employee.name);
    });

    $scope.reports = reports.filter(report => {
        return report.managerId == $scope.user._id;
    });

    $scope.infraction_report = {
        manager: $scope.user._id,
        managerName: $scope.user.name
    };

    $scope.saveInfraction = () => {
        console.log('save pressed');
        
        //Add staff id number to obj
        $scope.staff.forEach(employee => {
            if(employee.name === $scope.infraction_report.staffName){
                $scope.infraction_report.staff = employee._id;
            }
        });

        InfractionReportFactory.create($scope.infraction_report)
        .then(saved => {
            $scope.infractions.push(saved);
            console.log('successfully saved');
        });


    };

    $scope.incident_report = {
        manager: $scope.user._id,
        managerName: $scope.user.name,
        copsCalled: 'no'
    };

    $scope.saveIncident = () => {

    };

    $scope.status = {
        opened: false
    };

    $scope.open = function($event) {
        $scope.status.opened = true;
    };

    $scope.mytime = new Date();

 
    $scope.toggleMode = function() {
        $scope.ismeridian = ! $scope.ismeridian;
    };

    $scope.update = function() {
        var d = new Date();
        d.setHours( 14 );
        d.setMinutes( 0 );
        $scope.mytime = d;
    };


});