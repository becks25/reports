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
                        console.log(infractions);
                        var infractionArr = [];

                        infractions.forEach(infraction => {
                            infractionArr.push(infraction.name);
                        });
                        console.log(infractionArr);
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

app.controller('ManagerCtrl', function ($scope, AuthService, Session, $state, staff, infractions, reports, InfractionReportFactory, IncidentReportFactory, SuggestionsFactory) {
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

    var reset_suggestions = () => {
        $scope.suggestions  = {};

        $scope.suggestions = {
            manager: $scope.user._id,
            managerName: $scope.user.name
        };

    }

    $scope.disable_sug_btn = false;
    $scope.sug_success = false;

    reset_suggestions();

    $scope.saveSuggestion = () => {
        $scope.disable_sug_btn = true;

        SuggestionsFactory.create($scope.suggestions)
        .then(saved => {
          console.log('success');
          reset_suggestions();
          $scope.disable_sug_btn = false;
          $scope.sug_success = true;
        });
      }

    var reset_inf_report = () => {
        $scope.infraction_report = {};
        $scope.infraction_report = {
            manager: $scope.user._id,
            managerName: $scope.user.name
        };

    }

    reset_inf_report();
    $scope.disable_inf_btn = false;
    $scope.inf_success = false;
   

    $scope.saveInfraction = () => {
        $scope.disable_inf_btn = true;
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
            $scope.newInfraction.$setPristine();
            reset_inf_report();
            $scope.disable_inf_btn = false;
            console.log('successfully saved');
            $scope.inf_success=true;
        });


    };

    var reset_inc_report = () => {
        $scope.incident_report = {};

        $scope.incident_report = {
            manager: $scope.user._id,
            managerName: $scope.user.name,
            copsCalled: 'false',
            staffNames: [],
            staff: []
        };
    }

    reset_inc_report();

    
    $scope.disable_inc_btn = false;
    $scope.inc_success = false;

    $scope.staffError = false;
    $scope.saveIncident = () => {
        //add staff ids
        $scope.disable_inc_btn = true;
        $scope.inc_success=false;

        if($scope.incident_report.staffNames.length === 0){
            $scope.staffError = true;
            return;
        }
        $scope.staff.forEach(employee => {
            if($scope.incident_report.staffNames.indexOf(employee.name) !== -1) $scope.incident_report.staff.push(employee._id);
        });

        //set incident time in right format
        $scope.currentTime.setMinutes($scope.now.minute);
        if($scope.now.m === 'PM' && $scope.now.hour > 12) $scope.now.hour += 12;
        $scope.currentTime.setHours($scope.now.hour);
        $scope.incident_report.time = $scope.currentTime;

        //save copsCalled boolean in right format
        if($scope.incident_report.copsCalled == 'false') $scope.copsCalled = false;
        else $scope.incident_report.copsCalled = true;

        IncidentReportFactory.create($scope.incident_report)
        .then(saved => {
            
            $scope.infractions.push(saved);
            $scope.newIncident.$setPristine();

            console.log('successfully saved');

            reset_inc_report();
            $scope.disable_inc_btn = false;
            $scope.inc_success=true;

        });
    };

    $scope.status = {
        opened: false
    };

    $scope.open = function($event) {
        $scope.status.opened = true;
    };

    $scope.currentTime = new Date(Date.now());
    $scope.now = {
        hour: $scope.currentTime.getHours(),
        minute: $scope.currentTime.getMinutes()
    };

    if($scope.now.hour < 12) $scope.now.m = 'AM';
    else{
        $scope.now.m = 'PM';
        if($scope.now.hour > 12) $scope.now.hour -= 12;
    }

    $scope.addStaff =() => {
        $scope.incident_report.staffNames.push($scope.selected);
        $scope.selected = "";
    };

});