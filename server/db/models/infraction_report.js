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
    staff: {
    	type: Schema.Types.ObjectId, 
    	ref: 'Staff', 
    	required: true
    },
    infraction: {
    	type: Schema.Types.ObjectId, 
    	ref: 'Infraction', 
    	required: true
    },
    timestamp: {
    	type: Date,
    	default: Date.now
    }

});


mongoose.model('Infraction_report', schema);