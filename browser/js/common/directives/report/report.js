app.directive('report', function ($uibModal, IncidentReportFactory, InfractionReportFactory, PositiveReportFactory, CurrentFactory) {
    return {
        restrict: 'E',
        templateUrl: 'js/common/directives/report/report.html',
        scope:{
          report: '='
        },
        link: (scope, elem, attr) => {
          scope.open = function () {
            CurrentFactory.currentReport = scope.report;
            console.log(scope.report);
            var modalInstance = $uibModal.open({
              templateUrl: 'js/common/directives/report-modal/report-modal.html',
              controller: 'modalCtrl'
            });


          }
          scope.t = new Date(scope.report.timestamp).getTime();
          scope.now = Date.now();

          scope.deletable = false;

          if(scope.now-scope.t <43200000) scope.deletable = true;

          scope.remove = () => {
            if(scope.report.infraction){
              console.log('here', scope.report);
              InfractionReportFactory.destroy(scope.report)
                .then(deleted => {
                  console.log('successfully deleted infraction');
                });
            }else if(scope.report.report){
              IncidentReportFactory.destroy(scope.report)
                .then(deleted => {
                  console.log('successfully deleted incident');
                });
            }else if(scope.report.positive){
              PositiveReportFactory.destroy(scope.report)
                .then(deleted => {
                    console.log('successfully delted incident');
                });
            }
          }
        }
    };
});