const { Thought } = require('../../model');

//reaction routes in CRUDdy order
const reactionControl = {
    //runs to the /api/thought/:thoughtId POST api call to create a new reaction
    reactToAThought({ params, body }, res) {
        Thought.findOneAndUpdate(
            { _id: params.thoughtId },
            { $push: { reactions: body }},
            { new: true, runValidators: true }
        )
        .then(data => {
            if (!data) {
                res.status(404).json({ message: 'a zen mind has no thoughts, same thing here' });
                return;
            }
            res.json(data);
        })
        .catch(err => res.json(err));
    },

    //runs to the /api/thought/:thoughtId/:reactionId DELETE api call to delete a new reaction
    unReact({ params },  res) {
        Thought.findOneAndUpdate(
            { _id: params.thoughtId },
            { $pull: { reactions: params.reactionId } },
            { new: true }
        )
        .then(data => {
            if (!data) {
                res.status(404).json({ message: 'no such reaction' });
                return;
            }
            res.json(data);
        })
        .catch(err => res.json(err));
    }
};

module.exports = reactionControl;