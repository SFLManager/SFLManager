var express = require('express');
var router = express.Router();

//Get Home Page
router.get('/',function(req,res){
    res.render('index');
});

function ensureAuthenticated(req, res, next){
	if(req.isAuthenticated()){
		return next();
	} else {
		req.flash('error_msg','You are not logged in');
		res.redirect('/users/login');
	}
}

router.get('/testing', function (req, res) {
    res.render('testing');
});


module.exports = router;