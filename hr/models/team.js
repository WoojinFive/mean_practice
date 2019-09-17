var mongoose = require('mongoose');
var postFind = require('mongoose-post-find');
var async = require('async');
var Schema = mongoose.Schema;
var TeamSchema = new Schema({
  name: {
    type: String,
    required: true
  }
})