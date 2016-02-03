app.directive('positiveForm', function () {
    return {
        restrict: 'E',
        templateUrl: 'js/common/directives/positive-form/positive-form.html',
        link: (scope, elem, attr) => {
          scope.selected = undefined;

        }
    };
});