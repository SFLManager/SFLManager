//THIS IS NOT USED ANYMORE
/*
router.post('/uploadAssignment', function (req, res) {
    if (!req.files)
        return res.status(400).send('No files were uploaded.');


    let sampleFile = req.files.file;
    var modulename = req.body.module;
    var username2 = req.body.username2;
    var title = req.body.title;
    var description = req.body.description;
    var filename = req.files.file.name;

    var date = new Date();

    req.checkBody('modulename', 'Module name is required').notEmpty();
    req.checkBody('username2', 'Username is required').notEmpty();
    req.checkBody('title', 'Title is required').notEmpty();
    req.checkBody('description', 'Description is required').notEmpty();
    req.checkBody('filename', 'Uploading a file is required').notEmpty();

    var errors = req.validationErrors();

    if (errors) {
        console.log(errors);
    }

    var location = 'storage/' + username2 + '/';
    var location2 = location + modulename + '/';
    mkdirp(path.join(process.cwd(), location2), function (err) {
        if (err) {
            return console.error(err);
        }
    });


    sampleFile.mv(location2 + sampleFile.name, function (err) {
        if (err)
            return res.status(500).send(err);
    });

    var newAssignment = new Assignment({
        creator: username2,
        module: modulename,
        title: title,
        description: description,
        date: date,
        filename: filename
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
*/