app.directive('staffDetails', function (StaffFactory, UserFactory) {
    return {
        restrict: 'E',
        templateUrl: 'js/common/directives/staff-details/staff-details.html',
        scope:{
          employee: '=',
          reports: '=',
          mgmt:'='
        },
        link: (scope, elem, attr) => {
          scope.infractions = scope.reports.filter(report => {
            if(!scope.mgmt){
              return report.staffName && report.staffName === scope.employee.name && report.infraction;
            }

            return report.staffName && report.managerName === scope.employee.name && report.infraction;
          });

          scope.positives = scope.reports.filter(report => {
            if(!scope.mgmt){
              return report.staffName && report.staffName === scope.employee.name && report.positive;
            }

            return report.staffName && report.managerName === scope.employee.name && report.positive;
          });

          scope.incidents = scope.reports.filter(report => {
            if(!scope.mgmt){
              return report.staffNames && report.staffNames.indexOf(scope.employee.name) !== -1;
            }
            return report.staffNames && report.managerName === scope.employee.name;

          });



          scope.myreports = scope.infractions.concat(scope.incidents).concat(scope.positives);

          scope.remove = () => {
            if(!scope.mgmt){
              StaffFactory.destroy(scope.employee._id)
              .then(destroyed=> {
                console.log('success!');
              })
              .catch(() => {
                console.log('error?');
              });
            }else{
              UserFactory.destroy(scope.employee._id)
              .then(destroyed=> {
                console.log('success!');
              })
              .catch(() => {
                console.log('error?');
              });
            }
          }
        }
    };
});