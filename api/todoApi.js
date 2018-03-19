var Comment = require('./../database/database.js');
var express = require('express');
var router = express.Router();

router.get('/aa', function(req, res, next) {

    Comment.find(function (err,comments) {
        if(err) {
            res.send(err)
            console.log('err')
        }
        if(!comments) {
            res.status(404).send();
            console.log('comments')
        }
        else {
            res.json(comments);
            console.log('json')
        }

    });
});

module.exports = router;
