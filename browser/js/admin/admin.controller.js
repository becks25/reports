app.controller('AdminCtrl', function ($scope, AuthService, Session, $state, staff, infractions, mgmt, incidentReports, infractionReports) {

    $scope.infractionReports = infractionReports;
    $scope.incidentReports = incidentReports;
    $scope.staff = staff;
    $scope.infractions = infractions;
    $scope.reports = $scope.infractionReports.concat($scope.incidentReports);
    $scope.managers = mgmt;

    $scope.startDate = {
        opened: false
    };

    $scope.endDate = {
        opened: false
    };

    $scope.open = function($event) {
        $scope.status.opened = true;
    };

    $scope.managers.forEach(manager => {
        manager.checked = true;
    });

    $scope.staff.forEach(staf => {
        staf.checked = true;
    });

    $scope.staffCollapsed = true;
    $scope.managerCollapsed = true;

    $scope.staffNumbers = {};
    $scope.reports.forEach(report => {
        var staff = [];

        if(report.staffName){
            staff.push(report.staffName);
        }else{
            staff.concat(report.staffNames);
        }

        staff.forEach(staf => {
            if(!$scope.staffNumbers[staf]) $scope.staffNumbers[staf] = 0;
            $scope.staffNumbers[staf]++;
        });

    });

    console.log($scope.staffNumbers);


    $scope.views= {
        staff: false,
        managers: false,
        reports: false,
        overview: true
    }

    $scope.view = (tab) => {
        for(var key in $scope.views){
            $scope.views[key] = false;
        };
        console.log(tab);

        $scope.views[tab]=true;
    };

});