const router = require('express').Router();
const error = require('../helpers/error');

router.get('/', (req, res) => {
    res.send('Hello Server is up and running');
});

router.use('/users', require('./user'));

//TO catch all route
router.all('*', (req, res) => {
    return res.status(400).send(error(false, 'Route Not Found'));
});

module.exports = router;