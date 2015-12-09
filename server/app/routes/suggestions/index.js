var router = require('express').Router();
var mongoose = require('mongoose');
module.exports = router;
var _ = require('lodash');
var Suggestions = mongoose.model('Suggestions');


//get all suggestions
router.get('/', (req, res, next) => {
    Suggestions.find().exec()
    .then(suggestions => res.send(suggestions))
    .then(null, next);
});

//create one
router.post('/', (req, res, next) => {
    if (!req.user.isAdmin && !req.user.superAdmin){
        res.sendStatus(401);
        return;
    }
    Suggestions.create(req.body)
    .then(function(newSuggestions){
        res.status(201).send(newSuggestions);
    })
    .then(null, next);
});

//edit one
router.put('/:suggestionsId', (req, res, next) => {
    if (!req.user.isAdmin && !req.user.superAdmin){
        res.sendStatus(401);
        return;
    }
    _.assign(req.foundSuggestion, req.body);
    req.foundSuggestion.save()
    .then(suggestion => res.status(200).send(suggestion))
    .then(null, next);
});

//delete one
router.delete('/:suggestionsId', (req, res, next) => {
    if (!req.user.isAdmin && !req.user.superAdmin){
        res.sendStatus(401);
        return;
    }
    Suggestions.remove({_id: req.foundSuggestion._id}).exec()
    .then(removed => res.status(200).send(removed))
    .then(null, next);
});

router.param('suggestionsId', (req, res, next, suggestionsId) => {
    Suggestions.findById(suggestionsId)
    .then(suggestion => {
            req.foundSuggestion = suggestion;
            next();
        })
    .then(null, next)
});
