const { User } = require('../../model');

//friend routes in CRUDdy order
const friendControl = {
    //runs to the /api/user/:userId/friend/:friendId POST api call to create new friend
    makeFriend({ params }, res) {
        User.findOneAndUpdate(
            { _id: params.userId },
            { $push: { friends: params.friendId } },
            { new: true, runValidators: true }
        )
        .then(data => {
            if (!data) {
                res.status(404).json({ message: `we can't find your buddy` });
                return;
            }
            res.json(data);
            })
        .catch(err => res.json(err));
    },

    breakUp({ params }, res) {
        User.findOneAndUpdate(
            { _id: params.userId },
            { $pull: { friends: params.friendId } },
            { new: true }
        )
        .then(data => {
            if (!data) {
                res.status(404).json({ message: `your buddy is missing` });
                return;
            }
            res.json(data);
            })
        .catch(err => res.json(err));
    }
};

module.exports = friendControl;