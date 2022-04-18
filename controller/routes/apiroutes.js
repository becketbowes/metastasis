const router = require('express').Router();
const { makeUser, getUsers, getAUser, updateAUser, IceAUser } = require('../api/users');
const { makeFriend, breakUp } = require('../api/friends');
const { thinkThought, getAllThoughts, getAThought, rethinkThought, unthinkThought } = require('../api/thoughts');
const { reactToAThought, unReact } = require('../api/reactions');

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
    .route('/thought/:userId')
    .post(thinkThought);

router
    .route('/thought/:thoughtId')
    .get(getAThought)
    .put(rethinkThought)
    .delete(unthinkThought);

//reaction routes    
router
    .route('/thought/:thoughtId/reaction')
    .post(reactToAThought);

router
    .route('/thought/:thoughtId/reaction/:reactionId')
    .delete(unReact);

module.exports = router;