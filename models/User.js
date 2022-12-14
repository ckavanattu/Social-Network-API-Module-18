const { Schema, model } = require("mongoose");


const UserSchema = new Schema (
    {
        username: {
            type: String,
            unique: true,
            trim: true,
            required: 'please provide a username'
        },
        email:{
            type: String,
            required: "please provide an email",
            unique: true,
            match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/]
        },
        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: "Thought",
            },
        ],
        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User'
            }
        ]

    },
    {
        toJSON: {
            virtuals: true,
            getters: true,
        },
        id: false,
    }
);


UserSchema.virtual("friendCount").get(function () {
    return this.friends.length;
  });

const User = model("User", UserSchema)

module.exports = User;