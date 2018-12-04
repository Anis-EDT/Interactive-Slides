var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Product = require('./../models/productSchema');


router.get('/', function(req, res, next) {

    Product.find(function (err,products) {
        if(err) {
            res.send(err)
        }
        if(!products) {
            res.status(404).send();
        }
        else {
            res.json(products);
        }

    });
});

router.post('/', (req, res,next) => {
    let product = new Product(req.body);
    product.save().then((doc) => {
        res.send(doc);
    }).catch((e) => {
        res.status(400).send(e);
    });
});

module.exports = router;