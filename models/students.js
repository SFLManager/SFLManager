/*
This is the model for student accounts
All created and managed by the teacher
*/


var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/authentication');

var db = mongoose.connection;

var StudentSchema = mongoose.Schema({
    surname : {
        type: String
    },
    firstname: {
        type : String
    },
    studentnumber : {
        type: String,
        index:true
    },
    email : {
        type: String
    },
    unviersity : {
        type: String
    },
    username : {
        type:String
    },
    password : {
        type:String
    }
    
});

var Student = module.exports = mongoose.model('Student' , StudentSchema);

module.exports.createStudent = function(newStudent, callback){
    bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(newStudent.password, salt, function(err, hash) {
            newStudent.password = hash;
            newStudent.save(callback);
        });
    });
}

module.exports.getStudentByUsername = function(username, callback){
    var query = {username: username};
    Student.findOne(query, callback);
}

module.exports.getStudentById = function(id, callback){
    Student.findById(id, callback);
}

module.exports.comparePassword = function(candidatePassword, hash, callback){
    bcrypt.compare(candidatePassword, hash, function(err, isMatch) {
        if(err) throw err;
        callback(null, isMatch);
    });
}

module.exports.example = function() {
    var query = Student.find({}).lean().exec();
    return query;
}