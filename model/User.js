const { Schema, model } = require('mongoose');

const UserSchema = new Schema({
    username: { type: String, unique: true, required: 'we need a name, my friend', trim: true },
    email: { 
        type: String, 
        unique: true, 
        required: 'we need an email, please', 
        validate: { validator: function(v) {
            return /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test; 
        }, message: badEmail => `sources say ${badEmail.value} is not a valid email` }, 
    thoughts: [{ type: Schema.Types.ObjectId, ref: 'Thought'}],
    friends: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    }
},
{
    toJSON: { virtuals: true }, id: false
});

User.virtual('friendCount').get(function() {
    return this.friends.length;
})

const User = model('User', UserSchema);

module.exports = User;