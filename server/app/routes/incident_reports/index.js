var router = require('express').Router();
var mongoose = require('mongoose');
module.exports = router;
var _ = require('lodash');
var Incident = mongoose.model('Incident');

router.use('*', (req, res, next) => {
    if(!req.user){
        res.sendStatus(401);
        return;
    }
    next();
});

//get all incident reports
router.get('/', (req, res, next) => {
    Incident.find().exec()
    .then(incidents => res.send(incidents))
    .then(null, next);
});

//create one
router.post('/', (req, res, next) => {
    Incident.create(req.body)
    .then(function(newIncident){
        res.status(201).send(newIncident);
    })
    .then(null, next);
});

//edit one
router.put('/:incidentId', (req, res, next) => {
    if (!req.user.isAdmin && !req.user.superAdmin && !req.expired){
        res.sendStatus(401);
        return;
    }
    _.assign(req.foundIncident, req.body);
    req.foundIncident.save()
    .then(incident => res.status(200).send(incident))
    .then(null, next);
});

//delete one
router.delete('/:incidentId', (req, res, next) => {
    if (!req.user.isAdmin && !req.user.superAdmin && !req.expired){
        res.sendStatus(401);
        return;
    }
    Incident.remove({_id: req.foundIncident._id}).exec()
    .then(removed => res.status(200).send(removed))
    .then(null, next);
});

router.param('incidentId', (req, res, next, incidentId) => {
    Incident.findById(incidentId)
    .then(incident => {
            var expired = (Date.now() - incident.timeStamp)/1000 > 43200;
            req.foundIncident = incident;
            req.expired = expired;

            next();
        })
    .then(null, next)
});
