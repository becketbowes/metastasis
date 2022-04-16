const { Schema, model, Types } = require('mongoose');

const ReactionSchema = new Schema({
    reactionId: { type: Schema.Types.ObjectId, default: () => new Types.ObjectId() },
    reactionText: { type: String, required: 'you cannot react without an act', maxlength: 280 },
    username: { type: String, required: 'a reaction must have an reactor', },
    createdAt: { type: Date, default: Date.now }
})

const ThoughtSchema = new Schema({
    thoughtText: { type: String, required: 'an empty thought holds no promise', maxlength: 280 },
    createdAt: { type: Date, default: Date.now },
    username: { type: String, required: 'a thought must have a thoughter' },
    reactions: [ReactionSchema]
},
{
    toJSON: { virtuals: true }, id: false
});

ThoughtSchema.virtual('reactionCount').get(function() {
    return this.reactions.length;
});

const Thought = model('Thought', ThoughtSchema);

module.exports = Thought;