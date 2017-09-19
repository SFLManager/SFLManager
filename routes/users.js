var express = require('express');
var router = express.Router();
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var User = require('../models/user');
var Student = require('../models/students');
var Admin = require('../models/admin');

// VIEW RENDERING //

// Register
router.get('/register', function (req, res) {
    res.render('register');
});

// Login
router.get('/login', function (req, res) {
    res.render('login');
});

// Students Test Page
router.get('/students', function (req, res) {
    res.render('students');
});

//Dashboard 
router.get('/dashboard', function (req, res) {
    res.render('dashboard');
});

//Student Dashboard
router.get('/sDashboard', function (req, res) {
    res.render('sDashboard');
});

//Teachers Login 
router.get('/log-teacher', function (req, res) {
    res.render('log-teacher');
});

//Students Login 
router.get('/log-student', function (req, res) {
    res.render('log-student');
});

//Admin Login
router.get('/log-admin', function (req, res) {
    res.render('log-admin');
});

//Admin Dashboard
router.get('/admin', function (req, res) {
    res.render('admin');
});
//END OF VIEWS



// Register User
router.post('/register', function (req, res) {
    var name = req.body.name;
    var email = req.body.email;
    var username = req.body.username;
    var password = req.body.password;
    var password2 = req.body.password2;
    var university = req.body.university;

    // Validation
    req.checkBody('name', 'Name is required').notEmpty();
    req.checkBody('email', 'Email is required').notEmpty();
    req.checkBody('email', 'Email is not valid').isEmail();
    req.checkBody('username', 'Username is required').notEmpty();
    req.checkBody('password', 'Password is required').notEmpty();
    req.checkBody('university', 'University name is required').notEmpty();
    req.checkBody('password2', 'Passwords do not match').equals(req.body.password);

    var errors = req.validationErrors();

    if (errors) {
        res.render('register', {
            errors: errors
        });
    } else {
        var newUser = new User({
            name: name,
            email: email,
            username: username,
            password: password,
            university: university
        });

        User.createUser(newUser, function (err, user) {
            if (err) throw err;
            console.log(user);
        });

        req.flash('success_msg', 'Teacher Account created');

        res.redirect('/users/admin');
    }
});


// PASSPORT FOR TEACHERS //
passport.use('teacher',new LocalStrategy(
    function (username, password, done) {
        User.getUserByUsername(username, function (err, user) {
            if (err) throw err;
            if (!user) {
                return done(null, false, {
                    message: 'Unknown User'
                });
            }

            User.comparePassword(password, user.password, function (err, isMatch) {
                if (err) throw err;
                if (isMatch) {
                    return done(null, user);
                } else {
                    return done(null, false, {
                        message: 'Invalid password'
                    });
                }
            });
        });
    }));

passport.serializeUser(function (user, done) {
    done(null, user.id);
});

passport.deserializeUser(function (id, done) {
    User.getUserById(id, function (err, user) {
        done(err, user);
    });
});


//PASSPORT FOR STUDENTS //
passport.use('student',new LocalStrategy(
    function (username, password, done) {
        Student.getStudentByUsername(username, function (err, student) {
            if (err) throw err;
            if (!student) {
                return done(null, false, {
                    message: 'Unknown User'
                });
            }

            Student.comparePassword(password, student.password, function (err, isMatch) {
                if (err) throw err;
                if (isMatch) {
                    return done(null, student);
                } else {
                    return done(null, false, {
                        message: 'Invalid password'
                    });
                }
            });
        });
    }));

passport.serializeUser(function (student, done) {
    done(null, student.id);
});

passport.deserializeUser(function (id, done) {
    Student.getUserById(id, function (err, student) {
        done(err, student);
    });
});




//Teacher Login Authentication
router.post('/log-teacher',
            passport.authenticate('teacher', {
    successRedirect: '/users/dashboard',
    failureRedirect: '/users/log-teacher',
    failureFlash: true
}),
            function (req, res) {
    res.redirect('/users/dashboard');
});

//Student Login Authentication
router.post('/log-student',
            passport.authenticate('student', {
    successRedirect: '/users/sDashboard',
    failureRedirect: '/users/log-student',
    failureFlash: true
}),
            function (req, res) {
    res.redirect('/users/sDashboard');
});

//Admin Login 
router.post('/log-admin', function (req, res) {
    var username = req.body.username;
    var password = req.body.password;
    if(username == "MUCSSE2017" && password == "1e49x742"){
        res.redirect('/users/admin')
    }
    else{
        res.redirect('/users/log-admin');
    }
});




//Logging Out 
router.get('/logout', function (req, res) {
    req.logout();

    req.flash('success_msg', 'You are logged out');

    res.redirect('/');
});




router.post('/everything', function (req, res) {
    var query = User.example();

    query.then((users) => {
        res.json(users);
    })
        .catch((err) => {
        res.send("error found");
    });
});



router.put('/students', function (req, res) {
    var query = Student.example();

    query.then((student) => {
        res.json(student);
    })
        .catch((err) => {
        res.send("error found");
    });
});

router.post('/students', function (req, res) {
    var surname = req.body.surname;
    var firstname = req.body.firstname;
    var studentnumber = req.body.studentnumber;
    var email = req.body.email;
    var university = req.body.university;
    var username = req.body.username;
    var password = req.body.password;
    var password2 = req.body.password2;

    // Validation
    req.checkBody('surname', 'surname is required').notEmpty();
    req.checkBody('firstname', 'firstname is required').notEmpty();
    req.checkBody('studentnumber', 'studentnumber is required').notEmpty();
    req.checkBody('university', 'University name is required').notEmpty();
    req.checkBody('email', 'Email is required').isEmail();
    req.checkBody('username', 'Username is required').notEmpty();
    req.checkBody('password', 'Password is required').notEmpty();
    req.checkBody('password2', 'Passwords do not match').equals(req.body.password);

    var errors = req.validationErrors();

    if (errors) {
        res.render('register', {
            errors: errors
        });
    } else {
        var newStudent = new Student({
            surname: surname,
            firstname: firstname,
            studentnumber: studentnumber,
            username: username,
            email: email,
            university: university,
            password: password,

        });

        Student.createStudent(newStudent, function (err, student) {
            if (err) throw err;
            console.log(student);
        });

        req.flash('success_msg', 'You are registered and can now login');

        res.redirect('/users/log-student');
    }
});





module.exports = router;
