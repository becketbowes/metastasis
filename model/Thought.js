const { Schema, model, Types } = require('mongoose');
const dateFormat = require('../view/utils/dateFormat')

//creates Schema for 'thoughts' and 'reactions' using mongoose
const ReactionSchema = new Schema({
    reactionId: { type: Schema.Types.ObjectId, default: () => new Types.ObjectId() },
    reactionText: { type: String, required: 'you cannot react without an act', maxlength: 280 },
    username: { type: String, required: 'a reaction must have an reactor', },
    createdAt: { type: Date, default: Date.now, get: (createdAtVal) => dateFormat(createdAtVal) }
},
{
    toJSON: { getters: true }, id: false
})

const ThoughtSchema = new Schema({
    thoughtText: { type: String, required: 'an empty thought holds no promise', maxlength: 280 },
    createdAt: { type: Date, default: Date.now, get: (createdAtVal) => dateFormat(createdAtVal) },
    username: { type: String, required: 'a thought must have a thoughter' },
    reactions: [ReactionSchema]
},
{
    toJSON: { virtuals: true, getters: true }, id: false
});

//adds total of reactions as a useable value that isn't stored per se in the database
ThoughtSchema.virtual('reactionCount').get(function() {
    return this.reactions.length;
});

//creates the actual model from the schema
const Thought = model('Thought', ThoughtSchema);

//ships out the thought model for use
module.exports = Thought;