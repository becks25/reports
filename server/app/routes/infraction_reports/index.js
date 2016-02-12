var router = require('express').Router();
var mongoose = require('mongoose');
module.exports = router;
var _ = require('lodash');
var Report = mongoose.model('Infraction_report');

router.use('*', (req, res, next) => {
    if(!req.user){
        res.sendStatus(401);
        return;
    }
    next();
});

//get all infraction reports
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
    _.assign(req.foundInfraction, req.body);
    req.foundInfraction.save()
    .then(infraction => res.status(200).send(infraction))
    .then(null, next);
});

//delete one
router.delete('/:reportId', (req, res, next) => {
    if (!req.user.isAdmin && !req.user.superAdmin || req.expired){
        res.sendStatus(401);
        return;
    }
    Report.remove({_id: req.foundInfraction._id}).exec()
    .then(removed => res.status(200).send(removed))
    .then(null, next);
});

router.param('reportId', (req, res, next, reportId) => {
    Report.findById(reportId)
    .then(infraction => {
            var expired = (Date.now() - new Date(infraction.timeStamp).getTime()) > 43200000;
            req.foundInfraction = infraction;
            req.expired = expired;

            next();
        })
    .then(null, next)
});
