const { Schema, model } = require("mongoose");


const ReactionSchema = new Schema ({
    reactionId: {
        type: Schema.Types.ObjectId,
        default: new Types.ObjectId()
    },
    reactionBody: {
        type: String,
        required: true,
        minLength: 1,
        maxLength: 280
    },
    username: {
        type: string,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
});

const ThoughtSchema = new Schema (
    {
        thoughtText: {
            type: String,
            required: 'please provide your thought',
            minLength: 1,
            maxLength: 280,
        },
        createdAt: {
            type: Date,
            default: Date.now,
        },
        username:{
            type: String,
            required: true,
        },
        reactions: [ReactionSchema],

    },
    {
        toJson: {
            virtuals: true,
            getters: true,
        },
        id: false,
    }
)


const Thought = model("Thought", ThoughtSchema);

module.exports = Thought;