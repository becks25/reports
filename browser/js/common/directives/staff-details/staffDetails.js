app.directive('staffDetails', function () {
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
              return report.staffName && report.staffName === scope.employee.name;
            }

            return report.staffName && report.managerName === scope.employee.name;
          });

          scope.incidents = scope.reports.filter(report => {
            if(!scope.mgmt){
              return report.staffNames && report.staffNames.indexOf(scope.employee.name) !== -1;
            }
            return report.staffNames && report.managerName === scope.employee.name;

          });

          scope.myreports = scope.infractions.concat(scope.incidents);
        }
    };
});