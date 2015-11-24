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
      console.log($scope.password, $scope.user);
      $scope.user.something = $scope.password;
      console.log($scope.user);
      UserFactory.save($scope.user)
      .then(saved => {
        console.log('success', saved);
        $scope.close();
      });
    };
});
