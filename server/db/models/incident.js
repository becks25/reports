'use strict';
var crypto = require('crypto');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var schema = new mongoose.Schema({
    manager: {
    	type: Schema.Types.ObjectId, 
    	ref: 'User'
    },
    managerName: {
        type: String,
        required: true
    },
    staff: [{
    	type: Schema.Types.ObjectId, 
    	ref: 'Staff'
    }],
    staffNames: [{
        type: String,
        required: true
    }],
    timestamp: {
    	type: Date,
    	default: Date.now
    },
    time: {
        type: Date
    },
    report: {
        type: String,
        required: true
    },
    disciplinary: {
        type: String
    },
    copsCalled: {
        type: Boolean,
        default: false
    },
    notes: {
        type: String
    }

});


mongoose.model('Incident', schema);