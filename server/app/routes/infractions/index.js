var router = require('express').Router();
var mongoose = require('mongoose');
module.exports = router;
var _ = require('lodash');
var Infraction = mongoose.model('Infraction');


//get all infractions
router.get('/', (req, res, next) => {
    Infraction.find().exec()
    .then(infractions => res.send(infractions))
    .then(null, next);
});

//create one
router.post('/', (req, res, next) => {
    if (!req.user.isAdmin && !req.user.superAdmin){
        res.sendStatus(401);
        return;
    }
    Infraction.create(req.body)
    .then(function(newInfraction){
        res.status(201).send(newInfraction);
    })
    .then(null, next);
});

//edit one
router.put('/:infractionId', (req, res, next) => {
    if (!req.user.isAdmin && !req.user.superAdmin){
        res.sendStatus(401);
        return;
    }
    _.assign(req.foundInfraction, req.body);
    req.foundInfraction.save()
    .then(infraction => res.status(200).send(infraction))
    .then(null, next);
});

//delete one
router.delete('/:infractionId', (req, res, next) => {
    if (!req.user.isAdmin && !req.user.superAdmin){
        res.sendStatus(401);
        return;
    }
    Infraction.remove({_id: req.foundInfraction._id}).exec()
    .then(removed => res.status(200).send(removed))
    .then(null, next);
});

router.param('infractionId', (req, res, next, infractionId) => {
    Infraction.findById(infractionId)
    .then(infraction => {
            req.foundInfraction = infraction;
            next();
        })
    .then(null, next)
});
