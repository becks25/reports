/*

This seed file is only a placeholder. It should be expanded and altered
to fit the development of your application.

It uses the same file the server uses to establish
the database connection:
--- server/db/index.js

The name of the database used is set in your environment files:
--- server/env/*

This seed file has a safety check to see if you already have users
in the database. If you are developing multiple applications with the
fsg scaffolding, keep in mind that fsg always uses the same database
name in the environment files.

*/

var mongoose = require('mongoose');
var Promise = require('bluebird');
var chalk = require('chalk');
var connectToDb = require('./server/db');
var User = Promise.promisifyAll(mongoose.model('User'));
var Staff = Promise.promisifyAll(mongoose.model('Staff'));
var Infraction = Promise.promisifyAll(mongoose.model('Infraction'));
var Report = Promise.promisifyAll(mongoose.model('Infraction_report'));
var Incidents = Promise.promisifyAll(mongoose.model('Incident'));

User.remove({}, function(err, removed) {
  if (err) console.log(err);
});

Staff.remove({}, function(err, removed) {
  if (err) console.log(err);
});

Infraction.remove({}, function(err, removed) {
  if (err) console.log(err);
});

Report.remove({}, function(err, removed) {
  if (err) console.log(err);
});

Incidents.remove({}, function(err, removed) {
  if (err) console.log(err);
});

var users = [
    {
        username: 'Beckylee',
        name: 'Beckylee',
        password: 'testing',
        superAdmin: true
    },
    {
        username: 'mgmt',
        name: 'John',
        password: 'testing'
    },
    {
        username: 'Jake',
        name: 'Jake',
        password: 'testing',
        superAdmin: true
    }
];

var seedUsers = function () {
    
    return User.createAsync(users);
};

var staff = [
        {
            name: 'Joe Pesci'
        },
        {
            name: 'Ray Liotta'
        },
        {
            name: 'Robert De Niro'
        }
    ];

var seedStaff = function () {

    return Staff.createAsync(staff);

};

var infractions = [
        { name: 'Tardy'}, 
        { name: 'Cell phone'}, 
        { name: 'Being a dumbass'}
    ];

var seedInfraction = function() {
   
    return Infraction.createAsync(infractions);
}




connectToDb.then(function () {
    User.findAsync({}).then(function (users) {
            return seedUsers().then(function(users) {
                        return seedStaff().then(function(staff) {
                            var reports = [];

                            for(var i =0; i<3; i++){
                                reports.push({
                                    manager: users[i]._id,
                                    managerName: users[i].name,
                                    staff: staff[i]._id,
                                    staffName: staff[i].name,
                                    infraction: infractions[i].name
                                });
                            };

                            return Report.createAsync(reports).then(function(reports){
                                var incident = {
                                    manager: users[1]._id,
                                    managerName: users[1].name,
                                    staff: [staff[1]._id, staff[2]._id],
                                    staffNames: [staff[1].name, staff[2].name],
                                    report: 'Being stupid'
                                };
                                return Incidents.createAsync(incident);
                            });
                        })
                    }).then(seedInfraction);
    }).then(function () {
        console.log(chalk.green('Seed successful!'));
        process.kill(0);
    }).catch(function (err) {
        console.error(err);
        process.kill(1);
    });
});
