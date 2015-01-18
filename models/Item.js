var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new mongoose.Schema({
 title: { type: String, trim: true},
 description: { type: String, trim: true},
 user: {type : Schema.ObjectId, ref : 'User'}
});

module.exports = mongoose.model('Items', userSchema);
