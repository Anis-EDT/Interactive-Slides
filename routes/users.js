let express = require('express');
let router = express.Router();
const _ = require('lodash');
let ObjectID = require('mongoose').Types.ObjectId;
let User= require('./../models/user');
let authenticate = require('./authenticate_admin').authenticate;
const fs = require('fs');

router.get('/', (req, res) => {
    User.find().then((users) => {
        res.send({users});
    }).catch((e) => {
        res.status(400).send(e);
    });
});

router.get('/me',function(req, res){
    let token = req.header('Authorization') ;
    User.findByToken(token).then(function (user) {
        if(!user){
            return Promise.reject();
        }
        res.send(user)
    }).catch(function (e) {
        res.status(401).send();
    });
});

router.get('/:id', (req, res) => {
    let id = req.params.id;

    if (!ObjectID.isValid(id)) {
        return res.status(404).send();
    }

    User.findOne({"_id":id}).then((user) => {
        if (!user) {
            return res.status(404).send();
        }

        res.send({user});
    }).catch((e) => {
        res.status(400).send(e);
    });
});

router.post('/', function (req, res){
  let user = new User(JSON.parse(req.body.user));
	if (req.files) {
    // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
    let sampleFile = req.files.image;
    // Use the mv() method to place the file somewhere on your server
    sampleFile.mv(__dirname +'/../public/media/users/' + sampleFile.name, function (err) {
      if (err)
        return res.status(500).send(err);
    });
    user.picture = sampleFile.name;
  }
	user.save().then(function() {
    return user.generateAuthToken();
	}).then(function (token) {
    res.header('Authorization',token).send(user);
	}).catch(function(e){
    res.status(400).send(e);
	})
});


router.post('/login', function(req, res){
    let body = _.pick(req.body, ['email', 'password']);

    User.findByCredentials(body.email, body.password).then(function(user) {
        return user.generateAuthToken().then(function(token) {
            res.header('Authorization', token).send(user);
        });
    }).catch(function(e){
        res.status(400).send(e);
    });
});

router.delete('/logout', function(req, res){
    let token = req.header('Authorization');
    User.findByToken(token).then(function (user) {
        if(!user){
            return Promise.reject();
        }
        req.user = user;
        req.token = token;
        req.user.removeToken(req.token).then(function(){
            res.status(200).send();
        }, function(){
            res.status(400).send();
        });
    }).catch(function(e){
        res.status(401).send();
    });

});

router.delete('/:id',authenticate, (req, res) => {
    let id = req.params.id;

    if (!ObjectID.isValid(id)) {
        return res.status(404).send();
    }

    User.findByIdAndRemove(id).then((user) => {
        if (!user) {
            return res.status(404).send();
        }
        if (user.picture)
          fs.unlink(__dirname+'/public/media/users/'+user.picture);

        res.send({user});
    }).catch((e) => {
        res.status(400).send(e);
    });
});

router.put("/updatePos", function (req, res) {
    let id = req.body._id;
    User.findByIdAndUpdate(id, {position: req.body.position}, {new: true}).then(function(user) {
        res.send(user);
    }).catch((e) => {
        res.status(400).send(e);
    });
});
router.put("/addnotiftoken", function (req, res) {
  let id = req.body.userid;
  User.findById(ObjectID(id)).then(function(user) {
    console.log(user)
    user.notifID.push(req.body.ntoken)
    user.save()
    res.send({user});
  }).catch((e) => {
    res.status(400).send(e);
  });
});
router.put("/deletenotiftoken", function (req, res) {
  let id = req.body.userid;
  User.findById(ObjectID(id)).then(function(user) {
    console.log(user)
    var index= user.notifID.indexOf(req.body.ntoken)
    if (index > -1) {
      user.notifID.splice(index, 1);
      user.save()
    }
    res.send({user});
  }).catch((e) => {
    res.status(400).send(e);
  });
});

router.put("/", function (req, res) {
    let id = req.body._id;
    let user = new User({
        _id:req.body._id,
        firstname:req.body.firstname,
        lastname:req.body.lastname,
        email:req.body.email,
        password:req.body.password,
        role:req.body.role,
        picture:req.body.picture,
        birthdate:req.body.birthdate,
        cin:req.body.cin,
        salary:req.body.salary,
        amortization:req.body.amortization,
        sector:req.body.sector,
        phone:req.body.phone
    });
    console.log(id);
    User.findByIdAndUpdate(id, user, {new: true}).then(function(user) {
        res.send(user);
    }).catch((e) => {
        res.status(400).send(e);
    });
});

module.exports = router;
