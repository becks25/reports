'use strict';
var crypto = require('crypto');
var mongoose = require('mongoose');

var schema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    severity: {
    	type: Number,
    	max: 10,
    	min: 1
    }
});


mongoose.model('Infraction', schema);