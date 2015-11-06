app.directive('allReports', function () {
    return {
        restrict: 'E',
        templateUrl: 'js/common/directives/all-reports/all-reports.html',
        scope:{
          reports: "=",
          managers: "=",
          staff: "=",
          infractions: "="
        },
        link: (scope, elem, attr) => {
          scope.mgmtCollapsed = false;
          scope.staffCollapsed = false;
          scope.infractionCollapsed = false;
          scope.incidentCollapsed = false;
          scope.dateCollapsed = false;

        }
    };
});