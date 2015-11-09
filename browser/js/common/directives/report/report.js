app.directive('report', function ($uibModal) {
    return {
        restrict: 'E',
        templateUrl: 'js/common/directives/report/report.html',
        scope:{
          report: '='
        },
        link: (scope, elem, attr) => {
          scope.open = function () {

            console.log(scope.report);
            var modalInstance = $uibModal.open({
              templateUrl: 'js/common/directives/report-modal/report-modal.html',
              controller: function($scope, $uibModalInstance){
                $scope.report = scope.report;

                $scope.incident_report = $scope.report;

                $scope.close = () => {
                  $uibModalInstance.dismiss('cancel');
                };

                $scope.edit = false;
              }
            });
          }
        }
    };
});