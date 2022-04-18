const router = require('express').Router();
const { makeUser, getUsers, getAUser, updateAUser, IceAUser } = require('../api/users');
const { makeFriend, breakUp } = require('../api/friends');
const { thinkThought, getAllThoughts } = require('../api/thoughts');
const { reactToAThought } = require('../api/reactions');

//user routes:
router
    .route('/user')
    .post(makeUser)
    .get(getUsers);

router
    .route('/user/:id')
    .get(getAUser)
    .put(updateAUser)
    .delete(IceAUser);

//friend routes:
router
    .route('/users/:userId/friends/:friendId')
    .post(makeFriend)
    .delete(breakUp);

//thought routes:
router
    .route('/thoughts')
    .get(getAllThoughts);

router
    .route('/thoughts/:userId')
    .post(thinkThought);

//reaction routes    
router
    .route('/thoughts/:thoughtId/reaction')
    .post(reactToAThought);

module.exports = router;