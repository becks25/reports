var dbURI = 'mongodb://localhost:27017/testingDB';
var clearDB = require('mocha-mongoose')(dbURI);

var sinon = require('sinon');
var expect = require('chai').expect;
var mongoose = require('mongoose');

// Require in all models.
require('../../../server/db/models');

var Incident = mongoose.model('Incident');
var User = mongoose.model('User');
var Staff = mongoose.model('Staff');

describe('Incident Report model', function () {
    var userId;
    var staffId;
    var staffId2;

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


    beforeEach('Create staff 1', done => {
        Staff.create({name:'Joe'})
        .then(staff => {
            staffId = staff._id;
        }).then(done);
    });

    beforeEach('Create staff 2', done => {
        Staff.create({name:'Jim'})
        .then(staff => {
            staffId2 = staff._id;
        }).then(done);
    });


    afterEach('Clear test database', function (done) {
        clearDB(done);
    });

    it('should exist', function () {
        expect(Incident).to.be.a('function');
    });

    var createIncident = () => {
        return Incident.create({
            manager: userId,
            staff: [staffId, staffId2],
            report: 'Fighting'
        })
    };

    it('should successfully create an incident report', function (done) {
        createIncident()
        .then(report => {
            expect(report).to.exist;
            done();
        })
    });

    it('should successfully update an incident report', function (done) {
        createIncident()
        .then(report => {
            report.report = 'Fighting and Yelling';
            report.save()
            .then(updated => {
                expect(updated.report).to.equal('Fighting and Yelling');
                done();
            })
        })
    });

    it('should remove an incident report', function (done){
        createIncident()
        .then(report => {
            Incident.remove(report)
                .then(removed => {
                    Incident.find({_id: report._id})
                    .then(found => {
                         expect(found).to.be.empty;
                         done();
                    });
                   
                });
        })
    });



});
