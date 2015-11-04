var dbURI = 'mongodb://localhost:27017/testingDB';
var clearDB = require('mocha-mongoose')(dbURI);

var sinon = require('sinon');
var expect = require('chai').expect;
var mongoose = require('mongoose');

// Require in all models.
require('../../../server/db/models');

var Staff = mongoose.model('Staff');

describe('Staff model', function () {

    beforeEach('Establish DB connection', function (done) {
        if (mongoose.connection.db) return done();
        mongoose.connect(dbURI, done);
    });

    afterEach('Clear test database', function (done) {
        clearDB(done);
    });

    it('should exist', function () {
        expect(Staff).to.be.a('function');
    });


    var createStaff = () => {
        return Staff.create({name: 'John'});
    }

    it('should successfully create a staff member', function (done) {
        createStaff().then(function(staff) {
            expect(staff).to.exist;
            done();
        })
    });

    it('should remove a staff member', function(done){
        createStaff().then(staff => {
            Staff.remove(staff)
                .then(removed => {
                    Staff.find({_id: staff._id})
                    .then(found => {
                         expect(found).to.be.empty;
                         done();
                    });
                   
                });
        })
    });



});
