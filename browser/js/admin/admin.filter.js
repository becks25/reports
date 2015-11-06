app.filter('reportFilter', function(){
    return function(reports, managers, staff, infractions){
        var filtered = [];

        var checkedManagers = [];
        managers.forEach(mgmt => {
            if(mgmt.checked) checkedManagers.push(mgmt.name);
        });


        var checkedStaff = [];
        staff.forEach(stf => {
            if(stf.checked) checkedStaff.push(stf.name);
        });

        var checkedInf = [];
        infractions.forEach(inf => {
            if(inf.checked) checkedInf.push(inf.name);
        })

        reports.forEach(report => {
            var valid = true;
            if(checkedManagers.indexOf(report.managerName) === -1) valid = false;

            if(report.staffName){
                if(checkedStaff.indexOf(report.staffName) === -1) valid = false;
                if(checkedInf.indexOf(report.infraction) === -1) valid = false;
            }else{
                if(!report.staffNames.some(name => checkedStaff.indexOf(name) !== -1)) valid = false;
            }

            if(valid) filtered.push(report);
        });

        return filtered;

    }
});

app.filter('staffFilter', function() {
    return function(staff, numbers, minInf, maxInf){
        var filtered = [];
        var min, max;
        var names = [];
        console.log(numbers, minInf, maxInf);

        if(!minInf) min = 0;
        else min = minInf;

        if(maxInf) max = maxInf;

        for(var key in numbers){

            if(max){
                if(numbers[key] >= min && numbers[key] <= max){
                    names.push(key);
                };
            }else{
                if(numbers[key] >= min){
                    names.push(key);
                }
            }
        };

        staff.forEach(employee => {
            if(names.indexOf(employee.name) !== -1) filtered.push(employee);
        })

        return filtered;
    }
});