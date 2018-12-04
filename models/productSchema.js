
// load mongoose since we need it to define a model
var mongoose = require('mongoose');
var productSchema = new mongoose.Schema({
     name : {type:String, required: false, minlength: 1 },
     valeur_echantillon: {type:Number, required: false, minlength: 1},
 
});
module.exports = mongoose.model('product', productSchema);
