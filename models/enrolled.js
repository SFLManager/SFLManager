var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/authentication');

var db = mongoose.connection;

var EnrolledSchema = mongoose.Schema({
    studentID: {
        type: String,
        index: true,
    },
    classID: {
        type : String,
    }
});

var Enrolled = module.exports = mongoose.model('Enrolled' , EnrolledSchema);

module.exports.register = function(newRegister, callback){
    newRegister.save(callback);
}

module.exports.takingTheClass = function(moduleID){
    var query = Enrolled.find({classID:moduleID}).lean().exec();
    return query;
}

module.exports.all = function() {
    var query = Enrolled.find().lean().exec();
    return query;
}

module.exports.studentIsTaking = function(studentID){ 
    var query = Enrolled.find({studentID:studentID}).lean().exec();
    return query;
}

module.exports.findDetails = function() {
    var x = Enrolled.aggregate(
        { $lookup: 
         {
             from:'classstores',
             localField:'classID',
             foreignField: 'classKey',
             as: 'matching'
         }
        }


    );
    return x;
}