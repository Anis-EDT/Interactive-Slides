/**
 * Created by Omar on 2/20/2018.
 */
var mongoose = require('mongoose');
mongoose.Promise=global.Promise;
mongoose.connect('mongodb://127.0.0.1:27017/pharmacrm');
