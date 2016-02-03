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
    staff: {
    	type: Schema.Types.ObjectId, 
    	ref: 'Staff'
    },
    staffName: {
      type: String,
      required: true
    },
    positive: {
    	type: String
    },
    timestamp: {
    	type: Date,
    	default: Date.now
    },
    notes: {
        type: String
    }

});


mongoose.model('Positive_report', schema);