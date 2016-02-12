var router = require('express').Router();
var mongoose = require('mongoose');
module.exports = router;
var _ = require('lodash');
var Positive = mongoose.model('Positive');


//get all positives
router.get('/', (req, res, next) => {
    Positive.find().exec()
    .then(positives => res.send(positives))
    .then(null, next);
});

//create one
router.post('/', (req, res, next) => {
    if (!req.user.isAdmin && !req.user.superAdmin){
        res.sendStatus(401);
        return;
    }
    Positive.create(req.body)
    .then(function(newPositive){
        res.status(201).send(newPositive);
    })
    .then(null, next);
});

//edit one
router.put('/:positiveId', (req, res, next) => {
    if (!req.user.isAdmin && !req.user.superAdmin || req.expired){
        res.sendStatus(401);
        return;
    }
    _.assign(req.foundPositive, req.body);
    req.foundPositive.save()
    .then(positive => res.status(200).send(positive))
    .then(null, next);
});

//delete one
router.delete('/:positiveId', (req, res, next) => {
    if (!req.user.isAdmin && !req.user.superAdmin || req.expired){
        res.sendStatus(401);
        return;
    }
    Positive.remove({_id: req.foundPositive._id}).exec()
    .then(removed => res.status(200).send(removed))
    .then(null, next);
});

router.param('positiveId', (req, res, next, positiveId) => {
    Positive.findById(positiveId)
    .then(positive => {
            var expired = (Date.now() - new Date(positive.timestamp).getTime()) > 43200000;
            req.foundPositive = positive;
            req.expired = expired;
            next();
        })
    .then(null, next)
});
