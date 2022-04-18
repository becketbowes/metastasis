
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

    //runs to the /api/thoughts GET api call to retrieve all thoughts and associated reactions
    getAllThoughts(req, res) {
        Thought.find({})
        .populate({ path: 'reactions', select: '-__v' })
        .select('-__v')
        .then(data => {
            if (!data) {
                res.status(404).json({ message: 'here be 404 dragons'});
                return;
            }
            res.json(data);
        })
        .catch(err => { console.log(err); })
    },

    //runs to the /api/thought/:thoughtId GET call to retrieve one thought and associated reactions by id
    getAThought({ params }, res) {
        Thought.findOne({ _id: params.thoughtId })
        .populate({ path: 'reactions', select: '-__v' })
        .select('-__v')
        .then(data => {
            if (!data) {
                res.status(404).json({ message: 'here be 404 dragons'});
                return;
            }
            res.json(data);
        })
        .catch(err => { console.log(err); res.status(400).json(err); });
    },

    //runs to the /api/thought/:thoughtId PUT call to update a thought by id
    rethinkThought({ params, body}, res) {
        Thought.findOneAndUpdate({ _id: params.id}, body, { new: true, runValidators: true })
        .then(data => {
            if (!data) {
                res.status(404).json({ message: `i can't remember what we were talking about` });
                return;
            }
            res.json(data);
        })
        .catch(err => res.status(400).json(err));
    },

    //runs to the /api/thought/:thoughtId DELETE call to supress a thought forever
    unthinkThought({ params }, res) {
        Thought.findOneAndDelete({ _id: params.thoughtId})
        .then(data => {
            if (!data) {
                res.status(404).json({ message: `where is the thought?`});
                return;
            }
            res.json(data);
        })
        .catch(err => res.status(400).json(err))
    }
};

module.exports = thoughtControl;