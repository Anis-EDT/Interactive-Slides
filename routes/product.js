var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var product= require('./../database/productSchema');
var slide= require('./../database/slideSchema');

/*get*/
/*
router.get('/', function(req, res, next) {

    product.find(function (err,products) {
        console.log(products);
        res.render('product.twig', { title: 'My Form' ,products:products});

    });
    });
    */
/* POST form*/
/*
router.post('/',function (req,res) {
    console.log(req.body.product);

   new product({
   			title : req.body.title,
        	slides: req.body.slides

 
   })
       .save(function (err,product) {
           console.log(product)
           res.redirect('/product');
       })
});

*/
router.get('/', function(req, res, next) {
  slide.find(function(err,slides){
  console.log(slides);
  res.render('product.twig',{title:'helloWorld',slides : slides});

  });
});

router.post('/',function (req,res) {
    console.log(req.body.slide);

   new slide({
   			title : req.body.title,
        	content: req.body.content

 
   })
       .save(function (err,slide) {
           console.log(slide)
           res.redirect('/product');
       })
});

module.exports = router;