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
            
            var tempGrouped = _.groupBy(grouped[inf.name], (obj) => {
              return obj.staffId;
            });

            var nums = [];
            for(staf in tempGrouped){
              nums.push(tempGrouped[staf].length);
            }

            var stdev = 0;

            nums.forEach(num => {
              stdev += Math.pow((num - temp), 2);
            });

            if(nums.length < numStaff){
              var diff = numStaff - nums.length;

              for(var i = 0; i< diff; i++){
                stdev += Math.pow(-temp, 2);
              }
            }

            stdev = stdev/numStaff;

            inf.ave = temp;
            inf.min = _.min(nums);
            inf.max = _.max(nums);
            inf.stdev = stdev;
          });

          //group by staff, group by inf
          for(var inf in grouped){
            var byStaff = _.groupBy(grouped[inf], (obj) => {
              return obj.staffId;
            });

            for(var staf in byStaff){
              var infByStaff = _.groupBy(byStaff[staf], (obj) => {
                return obj.infraction;
              });
            }


            //stdev of each (sum of length of each-ave/total)
            //console.log('infs', infByStaff);
          }
          


        }
    };
});