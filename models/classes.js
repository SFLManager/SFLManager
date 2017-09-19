var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/authentication');

var db = mongoose.connection;


// This is the schema for storing classes, but not people enrolled in those classes
var ClassStoreSchema = mongoose.Schema({
    creator: {
        type: String
    },
    className: {
        type: String
    },
    classCode: {
        type: String,
    },
    classKey: {
        type: String,
        index: true
    }
});

var ClassStore = module.exports = mongoose.model('ClassStore', ClassStoreSchema);

module.exports.createClassStore = function (newClass, callback) {
    newClass.save(callback);
}

module.exports.findByCreator = function (creator) {
    var query = ClassStore.find({
        creator: creator
    }).lean().exec();
    return query;
}

module.exports.findall = function () {
    var query = ClassStore.find({}).lean().exec();
    return query;
}

module.exports.findById = function (Moduleid) {
    var query = ClassStore.find({
        _id: Moduleid
    }).lean().exec();
    return query;
}

module.exports.findAssignmentsByStudent = function (student) {

    console.log(student + " is currently being looking for their assignments");
    var query = ClassStore.aggregate([
        {
            $lookup: {
                from: "enrolleds",
                localField: "classKey",
                foreignField: "classID",
                as: "classKey"
            }
    },
        {
            $lookup: {
                from: "classassignments",
                localField: "creator",
                foreignField: "creator",
                as: "assignments"
            }
    },
        {
            $project: {
                "classKey": {
                    $filter: {
                        input: "$classKey",
                        as: "classKey",
                        cond: {
                            $eq: ["$$classKey.studentID", student]
                        }
                    }
                },
                creator: 1,
                classCode: 1,
                "assignments": {
                    $filter: {
                        input: "$assignments",
                        as: "assignments",
                        cond: {
                            $eq: ["$$assignments.module", "$classCode"]
                        }
                    }
                },
            },
    },
        {
            $unwind: "$classKey"
        },
        {
            $unwind: "$assignments"
        }
]).exec();
    console.log(student + " has been given their assignments")
    return query;
}
