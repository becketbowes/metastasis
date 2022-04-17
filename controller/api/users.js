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
        // .populate({ path: 'thoughts', select: '-__v'})
        .select('-__v')
        .sort({ _id: -1 })
        .then(data => res.json(data))
        .catch(err => { console.log(err); });
    },

    //runs to the /api/user/:id GET api call to find a new user by id
    getAUser({ params }, res) {
        User.findOne({ _id: params.id })
        // .populate({ path: 'thoughts', path: 'friends', select: '-__v' })
        .select('-__v')
        .then(data => {
            if (!data) {
                res.status(404).json({ message: 'there be 404 dragons up in this'});
                return;
            }
            res.json(data)
        })
        .catch(err => { console.log(err); res.status(400).json(err); });
        
    }
};

module.exports = userControl;