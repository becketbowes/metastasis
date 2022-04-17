
const { User, Thought } = require('../../model');

//thought and reaction CRUD routes together in CRUDdy order
const thoughtControl = {
    //runs to the /api/thought/:userId POST api call to post a new thought
    thinkThought({ params, body }, res) {
        Thought.create(body)
        .then(({ _id }) => {
            return User.findOneAndUpdate(
                { _id: params.userId },
                { $push: { thoughts: _id } },
                { new: true, runValidators: true }
            );
        })
        .then(data => {
            if (!data) {
                res.status(404).json({ message: 'we lost the thought' });
                return;
            }    
            res.json(data)
        })
        .catch(err => res.status(400).json(err));
    },

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

    //runs to the /api/thoughts GET api call to retrieve all thoughts and associated reactions
    getAllThoughts(req, res) {
        Thought.find({})
        .then(data => res.json(data))
        .catch(err => { console.log(err); })
    }

    //runs to the /api/thought/:userId/:thoughtId GET call to retrieve one thought and associated reactions by id

    //runs to the /api/thought/:userId/:thoughtId PUT call to update a thought by id

    //runs to the /api/thought/:userId/:thoughtId DELETE call to supress a thought forever

    //runs to the /api/thought/reaction DELETE to send a reaction to sleep with the fishes


};

module.exports = thoughtControl;