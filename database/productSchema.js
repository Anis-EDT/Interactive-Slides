
// load mongoose since we need it to define a model
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

productSchema = new Schema({
     name : String,
     picture : String,
     contenance : String,
     forme : String,
     prix_vente_grosiste_ttc: Number,
     prix_vente_public_ttc : Number,
     valeur_echantillon: Number,
     indication : String,
     posologie: String,

});
module.exports = mongoose.model('product', productSchema);
