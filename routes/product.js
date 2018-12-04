let express = require('express');
let router = express.Router();
let product= require('./../models/productSchema');

router.get('/', (req, res) => {
    product.find().then((product) => {
        res.json({product});

    }).catch((e) => {
        res.status(400).send(e);
    });
});

router.post('/', function (req, res){
    let pr = new product({
             name : req.body.name,
     valeur_echantillon:  req.body.valeur_echantillon,
   

    }, { _id: false });
    pr.save().then((doc) => {
    	console.log(doc);
        res.send(doc);
    }).catch((e) => {
        res.status(400).send(e);
    });
});

router.put("/", function (req, res) {
    let id = req.body._id;
    let pr = new product({
      

          _id: req.body._id,
            name: req.body.name,
            valeur_echantillon: req.body.valeur_echantillon,
          

    });
        product.findByIdAndUpdate(id, pr, {new: true}).then(function(user) {
        res.send(pr);
    }).catch((e) => {
        res.status(400).send(e);
    });
});
router.delete('/:id', (req, res) => {
    let id = req.params.id;
    product.findByIdAndRemove(id).then((products) => {
        res.send({products});
        return res.status(200).send();

    }).catch((e) => {
        res.status(400).send(e);
    });
});
router.get('/:id', (req, res) => {
    let id = req.params.id;
    product.findOne({"_id":id}).then((products) => {
        res.send({products});
        return res.status(200).send();

    }).catch((e) => {
        res.status(400).send(e);
    });
});
	
module.exports = router;
