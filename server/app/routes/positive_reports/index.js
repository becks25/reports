var router = require('express').Router();
var mongoose = require('mongoose');
module.exports = router;
var _ = require('lodash');
var Report = mongoose.model('Positive_report');

router.use('*', (req, res, next) => {
    if(!req.user){
        res.sendStatus(401);
        return;
    }
    next();
});

//get all positive reports
router.get('/', (req, res, next) => {
    Report.find().exec()
    .then(reports => res.send(reports))
    .then(null, next);
});

//create one
router.post('/', (req, res, next) => {
    Report.create(req.body)
    .then(function(newReport){
        res.status(201).send(newReport);
    })
    .then(null, next);
});

//edit one
router.put('/:reportId', (req, res, next) => {
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
router.delete('/:reportId', (req, res, next) => {
    if (!req.user.isAdmin && !req.user.superAdmin || req.expired){
        res.sendStatus(401);
        return;
    }
    Report.remove({_id: req.foundPositive._id}).exec()
    .then(removed => res.status(200).send(removed))
    .then(null, next);
});

router.param('reportId', (req, res, next, reportId) => {
    Report.findById(reportId)
    .then(positive => {
            var expired = (Date.now() - positive.timeStamp)/1000 > 43200;
            req.foundPositive = positive;
            req.expired = expired;

            next();
        })
    .then(null, next)
});
