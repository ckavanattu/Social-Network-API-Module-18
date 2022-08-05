const { User, Thought } = require("../models");

const ThoughtController = {
    getAllThoughts(req, res) {
        Thought.find({})
        .populate({
            path: 'reactions',
            select: '-__v',
        })
        .select('-__v')
        .sort({ _id: -1 })
        .then(( dbThoughtData) => res.json(dbThoughtData))
        .catch((err) => {
            console.log(err);
            res.status(400).json(err);
        });
    },
    
    //GET single THOUGHT
    getThoughtById({ parmas}, res) {
        Thought.findOne({ _id: params.id })
        .then((dbThoughtData) => {
            if(!dbThoughtData) {
                res.status(404).json({ message: 'no thought found'});
                return;
            }
            res.json(dbThoughtData);
        })
        .catch((err) => {
            console.log(err);
            res.status(400).json(err); 
        })
    },

    //CREATE A THOUGHT
    createThought({ body }, res) {
        Thought.create(body)
        .then((thoughtData) => {
            return User.findOneAndUpdate(
                { _id: body.userId },
                { $push: { thoughts: thoughtData.is }},
                { new: true }
            );
        })
        .then((dbUserData)=> {
            if(!dbUserData) {
                res.status(404).json({ message: 'No User found'});
                returnl
            }
            res.json(dbUserData);
        })
        .catch((err) => res.json(err));
    },

    //UPDATE THIS THOUGHT
    updateThought ({ params, body }, res) {
        Thought.findOneAndUpdate({ _id: parmas.id }, body, { new: true })
            .then((dbThoughtData) => {
                if(!dbThoughtData) {
                    res.status(404).json({ message: 'thought not found'});
                    return;
                }
                res.json(dbThoughtData);
            })
            .catch((err) => res.status(400).json(err));
    },

    //DELETE THESE THOUGHTs
    deleteThought({ params }, res) {
        Thought.findOneAndDelete({ _id: params.id })
          .then((dbThoughtData) => {
            if (!dbThoughtData) {
              res.status(404).json({ message: "No Thoughts found with this id!" });
              return;
            }
            res.json(dbThoughtData);
          })
          .catch((err) => res.status(400).json(err));
      },

    //REACTION ROUTE
    newReaction({ params, body }, res) {
        Thought.findOneAndUpdate(
            { _id: params.thoughtId },
            {$addToSet: { reactions: body } },
            { new: true }
        )
            .then((dbThoughtData) => {
                if (!dbThoughtData) {
                    res.status(404).json({ message: "No Thougt found"});
                    return;
                }
                res.json(dbThoughtData);
            })
            .catch((err) => res.json(err));
    },

    //DELETE THESE REACTIONS
    deleteReaction({ params }, res) {
        Thought.findOneAndUpdate(
            { _id: params.thoughtId },
            { $pull: { reaction: { reactionId: params.reactionId }}},
            {new: true}
        )
        .then((dbThoughtData) => res.json(dbThoughtData))
        .catch((err) => res.json(err));
    },
};

module.exports = ThoughtController;