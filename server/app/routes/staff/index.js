var router = require('express').Router();
var mongoose = require('mongoose');
module.exports = router;
var _ = require('lodash');
var Staff = mongoose.model('Staff');


//get all staff members
router.get('/', (req, res, next) => {
    Staff.find().exec()
    .then(staff => res.send(staff))
    .then(null, next);
});

//get one
router.get('/:staffId', (req, res, next) => {
    res.send(req.foundUser);
});

//create one
router.post('/', (req, res, next) => {
    if (!req.user.isAdmin && !req.user.superAdmin){
        res.sendStatus(401);
        return;
    }
    Staff.create(req.body)
    .then(function(newStaff){
        res.status(201).send(newStaff);
        // req.login(newUser, function(err){
        //     if (err) next(err);
        //     else res.status(201).send(newUser)
        // });
    })
    .then(null, next);
});

//edit one
router.put('/:staffId', (req, res, next) => {
    if (!req.user.isAdmin && !req.user.superAdmin){
        res.sendStatus(401);
        return;
    }
    _.assign(req.foundUser, req.body);
    req.foundUser.save()
    .then(staff => res.status(200).send(staff))
    .then(null, next);
});

//delete one
router.delete('/:staffId', (req, res, next) => {
    if (!req.user.isAdmin && !req.user.superAdmin){
        res.sendStatus(401);
        return;
    }
    Staff.remove({_id: req.foundUser._id}).exec()
    .then(removed => res.status(200).send(removed))
    .then(null, next);
});

router.param('staffId', (req, res, next, staffId) => {
    Staff.findById(staffId)
    .then(staff => {
            req.foundUser = staff;
            next();
        })
    .then(null, next)
});
