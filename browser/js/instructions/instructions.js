app.config(function ($stateProvider) {

    $stateProvider.state('instructions', {
        url: '/instructions',
        templateUrl: 'js/instructions/instructions.html',
        controller: 'InstructionsCtrl'
    });

});

app.controller('InstructionsCtrl', function ($scope, AuthService, Session, $state) {


    

});