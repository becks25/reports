var dbURI = 'mongodb://localhost:27017/testingDB';
var clearDB = require('mocha-mongoose')(dbURI);

var sinon = require('sinon');
var expect = require('chai').expect;
var mongoose = require('mongoose');

// Require in all models.
require('../../../server/db/models');

var Infraction = mongoose.model('Infraction');

describe('Infraction model', function () {

    beforeEach('Establish DB connection', function (done) {
        if (mongoose.connection.db) return done();
        mongoose.connect(dbURI, done);
    });

    afterEach('Clear test database', function (done) {
        clearDB(done);
    });

    it('should exist', function () {
        expect(Infraction).to.be.a('function');
    });


    var createInfraction = () => {
        return Infraction.create({name: 'Tardy', severity: 3});
    }

    it('should successfully create an infraction', function (done) {
        createInfraction().then(infraction => {
            expect(infraction).to.exist;
            done();
        })
    });

    it('should remove a infraction member', function(done){
        createInfraction().then(infraction => {
            Infraction.remove(infraction)
                .then(removed => {
                    Infraction.find({_id: infraction._id})
                    .then(found => {
                         expect(found).to.be.empty;
                         done();
                    });
                   
                });
        })
    });



});
