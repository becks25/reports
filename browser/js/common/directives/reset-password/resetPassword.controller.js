app.controller('passwordCtrl', function($scope, $uibModalInstance, UserFactory, AuthService){
    $scope.close = () => {
      $uibModalInstance.dismiss('cancel');
    };

    $scope.user;
    AuthService.getLoggedInUser().then(function (user) {
        $scope.user = user;
    });
    $scope.password= null;

    $scope.savePassword= () => {
      $scope.user.something = $scope.password;
      UserFactory.update($scope.user._id, {password: $scope.password})
      .then(saved => {
        console.log('success');
        $scope.close();
      });
    };
});
