const { User, Thought } = require('../../model');

//user routes in CRUDdy order
const userControl = {
    //runs to the /api/user POST api call to post a new user
    makeUser({ body }, res) {
        User.create(body)
        .then(data => res.json(data))
        .catch(err => res.status(400).json(err));
    },

    //runs to the /api/user GET api call to get all users
    getUsers(req, res) {
        User.find({})
        .populate({ path: 'thoughts', path: 'friends', select: '-__v' })
        .select('-__v')
        .sort({ _id: -1 })
        .then(data => res.json(data))
        .catch(err => { console.log(err); });
    },

    //runs to the /api/user/:id GET api call to find a new user by id
    getAUser({ params }, res) {
        User.findOne({ _id: params.id })
        .populate({ path: 'thoughts', path: 'friends', select: '-__v' })
        .select('-__v')
        .then(data => {
            if (!data) {
                res.status(404).json({ message: 'there be 404 dragons up in this'});
                return;
            }
            res.json(data);
        })
        .catch(err => { console.log(err); res.status(400).json(err); });
    },

    //runs to the /api/user/:id PUT api call to update user info
    updateAUser({ params, body }, res) {
        User.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true })
        .then(data => {
            if (!data) {
                res.status(404).json({ message: 'no such user' });
                return;
            }
            res.json(data);
        })
        .catch(err => res.status(400).json(err));
    },

    //runs to the /api/user/:id DELETE api call to delete user
    IceAUser({ params }, res) {
        User.findOne({ _id: params.id })
        .then(data => {
            console.log('101')
            if (data.thoughts.length) {
                console.log('102')
                for (i=0; i<data.thoughts.length;) {
                    Thought.findOneAndDelete({ _id: data.thoughts[i] })
                    .then(data => res.json(data))
                    .catch(err => res.status(400).json(err));
                    i++;
                }
            }
        })
        .then(() => {
            console.log('103')
            User.findOneAndDelete({ _id: params.id })
            .then(data => res.json(data))
            .catch(err => res.status(400).json(err))
        })
        .catch(err => res.status(400).json(err)); 
    }
};

module.exports = userControl;