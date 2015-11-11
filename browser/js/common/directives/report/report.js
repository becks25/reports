app.directive('report', function ($uibModal, IncidentReportFactory, CurrentFactory) {
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
        }
    };
});