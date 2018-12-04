let mongoose = require('mongoose');
//let jwt = require('jsonwebtoken');
//let bcrypt = require('bcryptjs');
let userSchema = new mongoose.Schema({
    firstname:{type:String, required: true, minlength: 1, unique:false },
    lastname:{type:String, required: true, minlength: 1, unique:false },


});

module.exports= mongoose.model('User',userSchema);