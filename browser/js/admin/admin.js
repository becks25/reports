app.config(function ($stateProvider) {

    $stateProvider.state('admin', {
        url: '/admin',
        templateUrl: 'js/admin/admin.html',
        data:{
            authenticate:true
        },
        controller: 'AdminCtrl',
        resolve: {
            staff: (StaffFactory) => {
                return StaffFactory.findAll();
            },
            mgmt: (UserFactory) => {
                return UserFactory.findAll();
            },
            infractions: (InfractionsFactory) => {
                return InfractionsFactory.findAll()
                    .then(infractions => {
                        var infractionArr = [];

                        infractions.forEach(infraction => {
                            var newObj = {
                                name: infraction.name,
                                checked: true,
                                _id: infraction._id
                            }
                            infractionArr.push(newObj);
                        });

                        return infractionArr;
                    })
            },
            incidentReports: (IncidentReportFactory) => {
                return IncidentReportFactory.findAll();
            },
            infractionReports: (InfractionReportFactory) => {
                return InfractionReportFactory.findAll();
            },
            suggestions: (SuggestionsFactory) => {
                return SuggestionsFactory.findAll();
            },
            positives: (PositiveFactory) => {
                return PositiveFactory.findAll();
            }
        }
    });

});



