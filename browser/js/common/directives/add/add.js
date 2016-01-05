app.directive('add', function (UserFactory, StaffFactory, InfractionsFactory) {
    return {
        restrict: 'E',
        templateUrl: 'js/common/directives/add/add.html',
        link: (scope, elem, attr) => {
          scope.new_manager = {};

          scope.saveManager = () => {
            UserFactory.create(scope.new_manager)
            .then(user => {
                console.log('success!');
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
              console.log('success!');
              scope.new_staff = {};
              scope.newStaff.$setPristine();
              console.log(scope.staff);
              scope.staff.push(employee);
            }).catch(() => {
              console.log('error?');
            });
          }

          scope.new_infraction = {};

          scope.saveInfraction = () => {
            InfractionsFactory.create(scope.new_infraction)
            .then(inf => {
              console.log('success!');
              scope.new_infraction = {};
              scope.newInfraction.$setPristine();
            }).catch(() => {
              console.log('error?');
            });
          }

          scope.dtstart = new Date('January 1, 2015');
          scope.dtend = new Date();
        }
    };
});