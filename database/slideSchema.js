
var mongoose = require('mongoose');

var Schema = mongoose.Schema;
slideSchema = new Schema({
    title : String,
    content : String,

});

module.exports = mongoose.model('slide', slideSchema);