var express = require('express');
var router = express.Router();
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var fileUpload = require('express-fileupload');
var mkdirp = require('mkdirp');
var path = require('path');



//This will manage all the class routing 
var User = require('../models/user');
var Student = require('../models/students');
var ClassStore = require('../models/classes');
var Enrolled = require('../models/enrolled');
var Assignment = require('../models/assignments');


router.post('/test', function (req, res) {
    if (!req.files)
        return res.status(400).send('No files were uploaded.');

    var modulename = req.body.module;
    var username2 = req.body.username2;
    var title = req.body.title;
    var description = req.body.description;
    var text = req.body.assignmentText;
    var date = new Date();

    req.checkBody('modulename', 'Module name is required').notEmpty();
    req.checkBody('username2', 'Username is required').notEmpty();
    req.checkBody('title', 'Title is required').notEmpty();
    req.checkBody('description', 'Description is required').notEmpty();
    req.checkBody('text', 'Text is required').notEmpty();

    var errors = req.validationErrors();

    if (errors) {
        console.log(errors);
    }

    var newAssignment = new Assignment({
        creator: username2,
        module: modulename,
        title: title,
        description: description,
        date: date,
        text: text
    });

    var x = Assignment.saveAssignmentInfo(newAssignment);
    x.then((user) => {
            console.log(user);
        })
        .catch((err) => {
            res.send("error found");
        });

    req.flash('success_msg', 'Successfully uploaded assignment');

    res.redirect('/users/dashboard');

});

router.get('/assignments', function (req, res) {
    var student = req.query.student;
    var query = ClassStore.findAssignmentsByStudent(student);
    query.then((user) => {
            res.json(user);
        })
        .catch((err) => {
            res.send("error found");
        });


});



//Teacher registers a new class to be stored online
router.post('/register', function (req, res) {
    var modulename = req.body.modulename;
    var modulecode = req.body.modulecode;
    var moduleprofessor = req.body.moduleprofessor;
    var modulekey = req.body.modulekey;
    // Validation
    req.checkBody('modulecode', 'Module name is required').notEmpty();
    req.checkBody('modulename', 'Module code is required').notEmpty();
    req.checkBody('moduleprofessor', 'Professor name is required').notEmpty();
    req.checkBody('modulekey', 'Please enter a module key').notEmpty();

    var errors = req.validationErrors();

    if (errors) {
        res.render('register', {
            errors: errors
        });
    } else {
        var newClass = new ClassStore({
            creator: moduleprofessor,
            className: modulename,
            classCode: modulecode,
            classKey: modulekey
        });

        ClassStore.createClassStore(newClass, function (err, user) {
            if (err) throw err;
            console.log(user);
        });

        req.flash('success_msg', 'Your new class has been created');

        res.redirect('/users/dashboard');
    }
});

//Returning Classes that the teacher has created
router.get('/store', function (req, res) {
    var creator = req.query.creator;
    var query = ClassStore.findByCreator(creator);

    query.then((user) => {
            res.json(user);
        })
        .catch((err) => {
            res.send("error found");
        });
});

//Returning Assignments that the teacher has uploaded back to the Teachers Dashboard
router.get('/returnAssignments', function (req, res) {
    var creator = req.query.creator;
    var query = Assignment.findByCreator(creator);

    query.then((user) => {
            res.json(user);
        })
        .catch((err) => {
            res.send("error found");
        });

});

//Student joins a class
router.post('/enroll', function (req, res) {
    var modulecode = req.body.modulecode;
    var username = req.body.username;



    // Validation
    req.checkBody('modulecode', 'Module name is required').notEmpty();
    req.checkBody('username', 'Username is required').notEmpty();


    var errors = req.validationErrors();

    if (errors) {
        console.log("  ");
        console.log(errors);

    } else {
        var newRegister = new Enrolled({
            studentID: username,
            classID: modulecode
        });

        Enrolled.register(newRegister, function (err, user) {
            if (err) throw err;
            console.log(user);
            return user;
        });

        req.flash('success_msg', 'You have enrolled in this class successfully');

        res.redirect('/users/sDashboard');
    }

});




router.get('/enrolledin', function (req, res) {
    var student = req.query.creator;
    var isEnrolled = Enrolled.findDetails(); //Enrolled.studentIsTaking(student);
    isEnrolled.then((user) => {
            res.json(user);
        })
        .catch((err) => {
            res.send("error found");
        });


});

router.post('/updateAssignment', function (req, res) {
    var username = req.body.username;
    var title = req.body.title;
    var description = req.body.description;
    var newText = req.body.text;
    //This will update the text in Mongo to include the changes the teacher has made
    var updating = Assignment.findAndUpdateAssignment(username, title, description, newText);
});

router.post('/saveSubmission', function (req, res) {
    var submission = req.body.submission; //annotation data
    var dateTime = req.body.dateTime; //annotation date
    var annotationTitle = req.body.assignmentTitle;
    var annotationDate = req.body.assignmentDate;
    var annotationModule = req.body.assignmentModule;
    var studentID = req.body.studentID;

    //seach for the assignment and update it with the current submission
    var submitAttempt = Assignment.findAndSubmitAttempt(annotationDate, annotationModule, annotationTitle, dateTime, submission, studentID);

});


module.exports = router;
