app.directive('allReports', function () {
    return {
        restrict: 'E',
        templateUrl: 'js/common/directives/all-reports/all-reports.html',
        scope:{
          reports: "=",
          managers: "=",
          staff: "=",
          infractions: "=",
          positives: "="
        },
        link: (scope, elem, attr) => {
          scope.mgmtCollapsed = false;
          scope.staffCollapsed = false;
          scope.infractionCollapsed = false;
          scope.incidentCollapsed = false;
          scope.positiveCollapsed = false;
          scope.dateCollapsed = false;
          scope.type = {
            Infraction: true,
            Incident: true,
            Positive: true
          };

          scope.cops = {
            No: true,
            Yes: true
          };

          scope.dtstart = new Date('January 1, 2015');
          scope.dtend = new Date();
          scope.status={
            start: false,
            end: false
          };

          scope.open = (event, date) => {
            scope.status[date] = !scope.status[date];
          }


          //download all data reports
          scope.download_all = function(){
            var csv = '';
            var col = ',';
            var row = '\n';



            csv += 'Type' + col + 'Date' + col + 'Manager' + col +'Staff' + col + 'InfPos' + col + 'Report' +col + 'Disciplinary' +row;
            
            scope.reports.forEach(function(report){
              if(report.report) csv+= 'Incident' + col;
              if(report.infraction) csv += 'Infraction' + col;
              if(report.positive) csv += 'Positive' + col;

              csv+= report.timestamp + col + report.managerName + col;

              if(report.staffName) csv+= report.staffName + col;
              else csv += report.staffNames.join(' ') + col;

              if(report.infraction) csv+= report.infraction + col;
              else if(report.positive) csv += report.positive + col;
              else csv += col;

              if(report.report) csv += report.report + col + report.disciplinary;

              csv+= row;
            });


             var data, filename, link;


            filename = 'AllReports.csv';

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