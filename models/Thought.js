const { Schema, model } = require("mongoose");
const dateFormat = require("../utils/dateFormat");


const ReactionSchema = new Schema ({
    reactionId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId()
    },
    reactionBody: {
        type: String,
        required: true,
        minLength: 1,
        maxLength: 280
    },
    username: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: (createdAtVal) => dateFormat(createdAtVal),
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
            get: (createdAtVal) => dateFormat(createdAtVal),
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