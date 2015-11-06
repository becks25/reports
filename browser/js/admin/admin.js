app.config(function ($stateProvider) {

    $stateProvider.state('admin', {
        url: '/admin',
        templateUrl: 'js/admin/admin.html',
        controller: 'AdminCtrl'
    });

});

app.controller('AdminCtrl', function ($scope, AuthService, Session, $state) {

    $scope.startDate = {
        opened: false
    };

    $scope.endDate = {
        opened: false
    };

    $scope.open = function($event) {
        $scope.status.opened = true;
    };

});