const router = require('express').Router();
const { makeUser, getUsers, getAUser } = require('../api/users');
const { thinkThought, reactToAThought, getAllThoughts } = require('../api/thoughts');

//user routes:
router
    .route('/user')
    .post(makeUser)
    .get(getUsers);

router
    .route('/user/:id')
    .get(getAUser);

//thought routes:
router
    .route('/thoughts/:userId')
    .post(thinkThought);

router
    .route('/thoughts/:thoughtId/reaction')
    .post(reactToAThought);

router
    .route('/thoughts')
    .get(getAllThoughts);

module.exports = router;
