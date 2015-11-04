app.directive('infractionForm', function () {
    return {
        restrict: 'E',
        templateUrl: 'js/common/directives/infraction-form/infraction-form.html',
        link: (scope, elem, attr) => {
          scope.selected = undefined;

        }
    };
});