app.directive('report', function ($uibModal, IncidentReportFactory) {
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

                $scope.now={
                  hour: new Date($scope.incident_report.time).getHours(),
                  minute: new Date($scope.incident_report.time).getMinutes()
                };

                if($scope.now.hour > 11){
                  $scope.now.m = 'PM'
                  if($scope.now.hour>12) $scope.now.hour -= 12;
                }else $scope.now.m = 'AM'

                $scope.incident_report.copsCalled = $scope.incident_report.copsCalled.toString();
                $scope.close = () => {
                  $uibModalInstance.dismiss('cancel');
                };

                $scope.edit = false;

                $scope.save_incident = () => {
                  console.log('saving incident');
                  IncidentReportFactory.save($scope.incident_report)
                  .then(saved => {
                    console.log('success', saved);
                    $scope.close();
                  });
                };

                $scope.delete_incident = () => {
                  IncidentReportFactory.destroy($scope.incident_report)
                  .then(deleted => {
                    console.log('success');
                    $scope.close();
                  });
                }
              }
            });
          }
        }
    };
});