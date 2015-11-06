app.directive('adminOverview', function (UserFactory, StaffFactory, InfractionsFactory) {
    return {
        restrict: 'E',
        templateUrl: 'js/common/directives/admin-overview/admin-overview.html',
        link: (scope, elem, attr) => {
          scope.new_manager = {};

          scope.saveManager = () => {
            UserFactory.create(scope.new_manager)
            .then(user => {
                console.log('success!', user);
                scope.new_manager = {};
                scope.newManager.$setPristine();
            }).catch(() => {
              console.log('error?');
            });
          };

          scope.new_staff = {};

          scope.saveStaff = () => {
            StaffFactory.create(scope.new_staff)
            .then(employee => {
              console.log('success!', employee);
              scope.new_staff = {};
              scope.newStaff.$setPristine();
            }).catch(() => {
              console.log('error?');
            });
          }

          scope.new_infraction = {};

          scope.saveInfraction = () => {
            InfractionsFactory.create(scope.new_infraction)
            .then(inf => {
              console.log('success!', inf);
              scope.new_infraction = {};
              scope.newInfraction.$setPristine();
            }).catch(() => {
              console.log('error?');
            });
          }
        }
    };
});