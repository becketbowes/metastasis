const router = require('express').Router();
const { makeUser, getUsers, getAUser } = require('../api/users');
const { thinkThought, reactToAThought } = require('../api/thoughts');

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
    .route('/thoughts/')
    .post(thinkThought);

router
    .route('thoughts/:id')
    .put(reactToAThought);

module.exports = router;
