app.directive('adminOverview', function (UserFactory, StaffFactory, InfractionsFactory) {
    return {
        restrict: 'E',
        templateUrl: 'js/common/directives/admin-overview/admin-overview.html',
        scope:{
          'infractionreports': '=',
          'incidents': '=',
          'infractions': '=',
          'staff': '='
        },
        link: (scope, elem, attr) => {
          /**INFRACTIONS
            -group all reports by infraction type
            -find mean & stdev of each group
          **/

          var grouped = _.groupBy(scope.infractionreports, (obj) => {
            return obj.infraction;
          });

          var numStaff = scope.staff.length;

          scope.infractions.map(inf => {
            var temp = grouped[inf.name].length/numStaff;
            inf.ave = temp;
          });

          //group by staff, group by inf
          for(var inf in grouped){
            var byStaff = _.groupBy(grouped[inf], (obj) => {
              return obj.staffId;
            });

            //stdev of each (sum of length of each-ave/total)
            console.log(byStaff);
          }
          


        }
    };
});