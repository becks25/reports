app.directive('navbar', function ($rootScope, AuthService, AUTH_EVENTS, $state, Session, $uibModal) {

    return {
        restrict: 'E',
        scope: {},
        templateUrl: 'js/common/directives/navbar/navbar.html',
        link: function (scope) {

            scope.items = [
                { label: 'Home', state: 'manager'},
                { label: 'Instructions', state: 'instructions'},
                { label: 'Admin', state: 'admin'}

            ];

            scope.user = null;

            scope.isLoggedIn = function () {
                return AuthService.isAuthenticated();
            };



            scope.logout = function () {
                AuthService.logout().then(function () {
                   $state.go('login');
                });
            };

            var setUser = function () {
                AuthService.getLoggedInUser().then(function (user) {
                    scope.user = user;
                });
            };

            var removeUser = function () {
                scope.user = null;
            };

            scope.resetPassword = function () {
                var modalInstance = $uibModal.open({
                  templateUrl: 'js/common/directives/reset-password/reset-password.html',
                  controller: 'passwordCtrl'
                });
            }

            setUser();

            $rootScope.$on(AUTH_EVENTS.loginSuccess, setUser);
            $rootScope.$on(AUTH_EVENTS.logoutSuccess, removeUser);
            $rootScope.$on(AUTH_EVENTS.sessionTimeout, removeUser);

        }

    };

});
