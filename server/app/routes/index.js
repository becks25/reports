'use strict';
var router = require('express').Router();
module.exports = router;

router.use('/members', require('./members'));
router.use('/users', require('./users'));
router.use('/staff', require('./staff'));
router.use('/infractions', require('./infractions'));
router.use('/report/infractions', require('./infraction_reports'));

// Make sure this is after all of
// the registered routes!
router.use(function (req, res) {
    res.status(404).end();
});
