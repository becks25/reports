app.controller('AdminCtrl', function ($scope, AuthService, Session, $state, staff, infractions, mgmt, incidentReports, infractionReports, suggestions, positives, positiveReports) {
    $scope.suggestions = suggestions;
    $scope.infractionReports = infractionReports;
    $scope.incidentReports = incidentReports;
    $scope.positiveReports = positiveReports;
    $scope.staff = staff;
    $scope.infractions = infractions;
    $scope.reports = $scope.infractionReports.concat($scope.incidentReports).concat($scope.positiveReports);
    $scope.managers = mgmt;
    $scope.positives = positives;

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
    $scope.staff.forEach(staf => {
        $scope.staffNumbers[staf.name] = 0;
    });

    $scope.reports.forEach(report => {
        var staff = [];

        if(report.staffName){
            staff.push(report.staffName);
        }else{
            staff.concat(report.staffNames);
        }

        staff.forEach(staf => {
            $scope.staffNumbers[staf]++;
        });

    });


    $scope.views= {
        staff: false,
        managers: false,
        reports: false,
        overview: true,
        suggestions: false,
        add: false
    }

    $scope.view = (tab) => {
        for(var key in $scope.views){
            $scope.views[key] = false;
        };

        $scope.views[tab]=true;
    };

    $scope.mgmtName;

    $scope.stfName;

    $scope.repMin;

    $scope.repMax;

});