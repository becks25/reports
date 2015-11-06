app.controller('AdminCtrl', function ($scope, AuthService, Session, $state, staff, infractions, reports, mgmt) {

    $scope.staff = staff;
    $scope.infractions = infractions;
    $scope.reports = reports;
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

});