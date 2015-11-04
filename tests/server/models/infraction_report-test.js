var dbURI = 'mongodb://localhost:27017/testingDB';
var clearDB = require('mocha-mongoose')(dbURI);

var sinon = require('sinon');
var expect = require('chai').expect;
var mongoose = require('mongoose');

// Require in all models.
require('../../../server/db/models');

var Report = mongoose.model('Infraction_report');
var User = mongoose.model('User');
var Staff = mongoose.model('Staff');

describe('Infraction Report model', function () {
    var userId;
    var staffId;

    beforeEach('Establish DB connection', function (done) {
        if (mongoose.connection.db) return done();
        mongoose.connect(dbURI, done);
    });

    beforeEach('Create user', done => {
        User.create({name:'John'})
        .then(user => {
            userId = user._id;
        }).then(done);
    });


    beforeEach('Create staff', done => {
        Staff.create({name:'Joe'})
        .then(staff => {
            staffId = staff._id;
        }).then(done);
    });


    afterEach('Clear test database', function (done) {
        clearDB(done);
    });

    it('should exist', function () {
        expect(Report).to.be.a('function');
    });


    it('should successfully create an infraction report', function (done) {
        Report.create({manager: userId, managerName: 'John', staff: staffId, staffName: 'Joe', infraction: 'Tardy'})
        .then(report => {
            expect(report).to.exist;
            done();
        })
    });

    it('should remove an infraction report', function(done){
        Report.create({manager: userId, managerName: 'John', staff: staffId, staffName: 'Joe', infraction: 'Tardy'})
        .then(report => {
            Report.remove(report)
                .then(removed => {
                    Report.find({_id: report._id})
                    .then(found => {
                         expect(found).to.be.empty;
                         done();
                    });
                   
                });
        })
    });



});
