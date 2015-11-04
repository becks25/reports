'use strict';
var crypto = require('crypto');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var schema = new mongoose.Schema({
    manager: {
    	type: Schema.Types.ObjectId, 
    	ref: 'User', 
    	required: true
    },
    staff: [{
    	type: Schema.Types.ObjectId, 
    	ref: 'Staff', 
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
    }

});


mongoose.model('Incident', schema);