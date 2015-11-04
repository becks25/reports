// Instantiate all models
var mongoose = require('mongoose');
require('../../../server/db/models');
var User = mongoose.model('User');

var expect = require('chai').expect;

var dbURI = 'mongodb://localhost:27017/testingDB';
var clearDB = require('mocha-mongoose')(dbURI);

var supertest = require('supertest');
var app = require('../../../server/app');

describe('Users Route', function () {

	beforeEach('Establish DB connection', function (done) {
		if (mongoose.connection.db) return done();
		mongoose.connect(dbURI, done);
	});

	afterEach('Clear test database', function (done) {
		clearDB(done);
	});

	describe('Unauthenticated request', function () {

		var guestAgent;

		beforeEach('Create guest agent', function () {
			guestAgent = supertest.agent(app);
		});

		it('should get a 401 response', function (done) {
			guestAgent.get('/api/users')
			.expect(401)
			.end(done);
		});

	});

	describe('Authenticated request', function () {

		var loggedInAgent;

		var userInfo = {
			name: 'Joe',
			email: 'joe@gmail.com',
			password: 'shoopdawoop',
			superAdmin: true
		};

		var user2 = {
			name: 'John'
		};

		var user3 = {
			name: 'Jake'
		}

		var user3Id;

		beforeEach('Create a user', function (done) {
			User.create(userInfo, done);
		});

		beforeEach('Create another user', function (done) {
			User.create(user3)
			.then(user => {
				user3Id = user._id;
				done();
			});
		});

		beforeEach('Create loggedIn user agent and authenticate', function (done) {
			loggedInAgent = supertest.agent(app);
			loggedInAgent.post('/login').send(userInfo).end(done);
			});

			it('should get a 200 response and with an array as the body', function (done) {
				loggedInAgent.get('/api/users').expect(200).end(function (err, response) {
				if (err) return done(err);
				expect(response.body).to.be.an('array');
				done();
			});
		});

		it('should get a 201 response and create a new user', function (done) {
			loggedInAgent.post('/api/users').send(user2).expect(201).end(function (err, response) {
			if (err) return done(err);
				expect(response.body).to.exist;
				expect(response.body.name).to.equal('John');
				done();
			});
		});

		it('should return a specific user', function (done) {
			loggedInAgent.get(`/api/users/${user3Id}`).end(function (err, response) {
				if(err) return done(err);
				console.log(response.body);
				expect(response.body).to.exist;
				expect(response.body.name).to.equal('Jake');
				done();
			});
		});


		it('should get a 200 response and update an existing user', function (done) {

				loggedInAgent.put(`/api/users/${user3Id}`)
					.send({name: 'Jake D.'}).expect(200)
					.end(function (err, response) {
						if(err) return done(err);
						expect(response.body).to.exist;
						expect(response.body.name).to.equal('Jake D.');
						done();
					});
		});

		it('should get a 200 response and remove an existing user', function (done) {
				loggedInAgent.del(`/api/users/${user3Id}`).expect(200)
					.end(function(err, response) {
						if(err) return done(err);
						expect(response.body.name).to.not.exist;
						done();
					});
		});



	});

});
