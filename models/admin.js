var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/authentication');

var db = mongoose.connection;

var AdminSchema = mongoose.Schema({
   username: {
       type: String,
       index: true
   },
    password: {
        type: String
    }
});

var Admin = module.exports = mongoose.model('Admin', AdminSchema);

