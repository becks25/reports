'use strict';
var crypto = require('crypto');
var mongoose = require('mongoose');

var schema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    position: {
    	type: Number,
      required: true
    }
});


mongoose.model('Positive', schema);