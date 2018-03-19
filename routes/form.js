var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var slide= require('./../database/slideSchema');


/* GET form. */
router.get('/', function(req, res, next) {
  slide.find(function(err,slides){
  console.log(slides);
  res.render('form.twig',{title:'helloWorld',slides : slides});

  });
});
/* POST form*/
router.post('/create',function(req, res){

	new slide({
		title : req.body.slide,
	

	}).save(function(err,slides){
		console.log(slides);
	res.redirect('form');
});

});
module.exports = router;


// references
