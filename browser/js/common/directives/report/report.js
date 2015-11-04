app.directive('report', function () {
    return {
        restrict: 'E',
        templateUrl: 'js/common/directives/report/report.html',
        scope:{
          report: '='
        },
        link: (scope, elem, attr) => {

        }
    };
});