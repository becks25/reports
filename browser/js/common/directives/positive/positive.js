app.directive('positive', function (PositiveFactory) {
    return {
        restrict: 'E',
        templateUrl: 'js/common/directives/positive/positive.html',
        scope: {
        	pos: '='
        },
        link: (scope, elem, attr) => {
          scope.remove = () => {
            PositiveFactory.destroy(scope.pos)
              .then(deleted => {
                console.log('success');
              });
          };

          scope.edit = false;

          scope.save_edit = () => {
            PositiveFactory.update(scope.pos._id, {name: scope.pos.name})
            .then(saved => {
              console.log('success');
              scope.edit = false;
            });
          }
        }
    };
});