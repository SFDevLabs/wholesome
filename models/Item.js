var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
 title: { type: String, trim: true},
 description: { type: String, trim: true},
});

module.exports = mongoose.model('Items', userSchema);
