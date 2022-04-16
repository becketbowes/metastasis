const router = require('express').Router();
const apiRoutes = require('./apiroutes');

router.use('/api', apiRoutes);

router.use((req, res) => {
    res.status(404).send('hic sunt 404 dracones');
});

module.exports = router;