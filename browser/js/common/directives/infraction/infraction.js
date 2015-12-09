app.directive('infraction', function (InfractionsFactory) {
    return {
        restrict: 'E',
        templateUrl: 'js/common/directives/infraction/infraction.html',
        scope: {
        	inf: '='
        },
        link: (scope, elem, attr) => {
          scope.remove = () => {
            InfractionsFactory.destroy(scope.inf)
              .then(deleted => {
                console.log('success');
              });
          };

          scope.edit = false;

          scope.save_edit = () => {
            InfractionsFactory.update(scope.inf._id, {name: scope.inf.name})
            .then(saved => {
              console.log('success');
              scope.edit = false;
            });
          }
        }
    };
});