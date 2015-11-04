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
            }
        }
    });

});

app.controller('ManagerCtrl', function ($scope, AuthService, $state, staff, infractions) {
    $scope.staff = staff;
    $scope.infractions = infractions;
   

});