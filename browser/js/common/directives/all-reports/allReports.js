app.directive('allReports', function () {
    return {
        restrict: 'E',
        templateUrl: 'js/common/directives/all-reports/all-reports.html',
        scope:{
          reports: "=",
          managers: "=",
          staff: "=",
          infractions: "=",
          positives: "="
        },
        link: (scope, elem, attr) => {
          scope.mgmtCollapsed = false;
          scope.staffCollapsed = false;
          scope.infractionCollapsed = false;
          scope.incidentCollapsed = false;
          scope.positiveCollapsed = false;
          scope.dateCollapsed = false;
          scope.type = {
            Infraction: true,
            Incident: true,
            Positive: true
          };

          scope.cops = {
            No: true,
            Yes: true
          };

          scope.dtstart = new Date('January 1, 2015');
          scope.dtend = new Date();
          scope.status={
            start: false,
            end: false
          };

          scope.open = (event, date) => {
            scope.status[date] = !scope.status[date];
          }




        }
    };
});