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
    timestamp: {
    	type: Date,
    	default: Date.now
    },
    comment: {
        type: String
    }

});


mongoose.model('Suggestions', schema);