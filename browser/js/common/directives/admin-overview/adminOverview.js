app.directive('adminOverview', function (UserFactory, StaffFactory, InfractionsFactory) {
    return {
        restrict: 'E',
        templateUrl: 'js/common/directives/admin-overview/admin-overview.html',
        scope:{
          'infractionreports': '=',
          'incidents': '=',
          'infractions': '=',
          'staff': '=',
          'allreports': '=',
          'positives': '=',
          'positivereports':'='
        },
        link: (scope, elem, attr) => {
          /**INFRACTIONS
            -group all reports by infraction type
            -find mean & stdev of each group
          **/

          var grouped = _.groupBy(scope.infractionreports, (obj) => {
            return obj.infraction;
          });

          var numInfs = scope.infractionreports.length;

          scope.infractions.map(inf => {
            if(!grouped[inf.name]) return;
            var temp = grouped[inf.name].length/numInfs;
            
            var tempGrouped = _.groupBy(grouped[inf.name], (obj) => {
              return obj.staffId;
            });


            var nums = [];
            var badEmp = [];
            var average = 0;

            for(staf in tempGrouped){
              nums.push(tempGrouped[staf].length);
              average+= tempGrouped[staf].length;
              tempGrouped[staf].num = tempGrouped[staf].length;
              if(tempGrouped[staf].length> temp){
                badEmp.push({
                  name: tempGrouped[staf][0].staffName,
                  num: tempGrouped[staf].length,
                  id: staf
                });
              }
            }
            average = average/nums.length;

            tempGrouped = _.sortBy()

            var stdev = 0;

            nums.forEach(num => {
              stdev += Math.pow((num - temp), 2);
            });

            if(nums.length < numInfs){
              var diff = numInfs - nums.length;

              for(var i = 0; i< diff; i++){
                stdev += Math.pow(-temp, 2);
              }
            }

            stdev = stdev/numInfs;

            inf.percent = Math.round(temp * 10000)/100;
            inf.ave = Math.round(average * 100)/100;
            inf.min = _.min(nums);
            inf.max = _.max(nums);
            inf.num = nums.length;
            inf.stdev = Math.round(stdev * 100)/100;
            inf.badEmp = badEmp;
          });

          scope.maxInf = _.max(scope.infractions, (inf)=>{
              return inf.percent;
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


          //POSITIVES
          var groupedPositive = _.groupBy(scope.positivereports, (obj) => {
            return obj.positive;
          });


          var numPos = scope.positivereports.length;

          scope.positives.map(pos => {

            if(!groupedPositive[pos.name]) return;
            var temp = groupedPositive[pos.name].length/numPos;
            
            var tempGrouped = _.groupBy(groupedPositive[pos.name], (obj) => {
              return obj.staffId;
            });


            var nums = [];
            var goodEmp = [];
            var average = 0;

            for(staf in tempGrouped){
              nums.push(tempGrouped[staf].length);
              average+= tempGrouped[staf].length;
              tempGrouped[staf].num = tempGrouped[staf].length;
              if(tempGrouped[staf].length> temp){
                goodEmp.push({
                  name: tempGrouped[staf][0].staffName,
                  num: tempGrouped[staf].length,
                  id: staf
                });
              }
            }

            average = average/nums.length;

            tempGrouped = _.sortBy()

            var stdev = 0;

            nums.forEach(num => {
              stdev += Math.pow((num - temp), 2);
            });

            if(nums.length < numPos){
              var diff = numPos - nums.length;

              for(var i = 0; i< diff; i++){
                stdev += Math.pow(-temp, 2);
              }
            }

            stdev = stdev/numPos;

            pos.percent = Math.round(temp * 10000)/100;
            pos.ave = Math.round(average * 100)/100;
            pos.min = _.min(nums);
            pos.max = _.max(nums);
            pos.num = nums.length;
            pos.stdev = Math.round(stdev * 100)/100;
            pos.goodEmp = goodEmp;
          });

          scope.maxPos = _.max(scope.infractions, (pos)=>{
              return pos.percent;
          });

          //group by staff, group by inf
          for(var pos in groupedPositive){
            var byStaff = _.groupBy(groupedPositive[pos], (obj) => {
              return obj.staffId;
            });

            for(var staf in byStaff){
              var posByStaff = _.groupBy(byStaff[staf], (obj) => {
                return obj.positive;
              });
            }
            //stdev of each (sum of length of each-ave/total)
            //console.log('infs', infByStaff);
          }
          

          //Create downloadable version of data
        scope.download_infractions = function(){
        //get all infractions & positives:
        // total, stdev, average
        //inf.name, inf.num, inf.ave, inf.stdev
         var csv = '';
          var col = ',';
          var row = '\n';

          csv += 'Name' + col + 'Number' + col + 'Average' + 'St Dev' + row;

          scope.infractions.forEach(function(inf){
            csv+= inf.name + col + inf.num + col + inf.ave + col + inf.stdev + row;
          });

          scope.positives.forEach(function(pos){
            csv+= pos.name + col + pos.num + col + pos.ave + col + pos.stdev + row;
          });


           var data, filename, link;


          filename = 'InfractionsAndPositives.csv';

          if (!csv.match(/^data:text\/csv/i)) {
              csv = 'data:text/csv;charset=utf-8,' + csv;
          }
          data = encodeURI(csv);
          console.log(data);

          link = document.createElement('a');
          link.setAttribute('href', data);

          link.setAttribute('download', filename);
          document.body.appendChild(link);
          link.click();
 
           };


        }
    };
});