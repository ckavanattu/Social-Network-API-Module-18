const { USVString } = require('webidl-conversions');
const { User } = require('../models');

const UserController = {
    // GET all
    allUsers(req, res) {
        User.find({})
          .populate({
            path: 'thoughts',
            select: '-__v'
          })
          .select('-__v')
          .sort({ _id: -1 })
          .then(dbUserData => res.json(dbUserData))
          .catch(err => {
            console.log(err);
            res.sendStatus(400).json(err);
          });
      },

    // GET one user
    getUserById({ params }, res) {
        User.findOne({ _id: params.id })
          .populate({
            path: 'thoughts',
            select: '-__v'
          })
          .select('-__v')
          .then(dbUserData => {
            if(!dbUserData) {
                res.status(404).json({ message: "No user found with this id!" });
                return;
            }
            res.json(dbUserData);
        })
          .catch(err => {
            console.log(err);
            res.sendStatus(400);
          });
      },

    // CREATE new user
    createUser( { body }, res) {
        User.create(body)
            .then(dbUserData => res.json(dbUserData))
            .catch((err)=> res.status(400).json(err));
    },

    // UPDATE user
    updateUser({ params, body }, res) {
        User.findOneAndUpdate({ _id: params.id }, body, { new: true})
            .then(dbUserData => {
                if(!dbUserData){
                    res.status(404).json({ message: 'user not found'});
                    return;
                }
                res.json(dbUserData);
            })
            .catch(err => res.status(400).json(err));
    },

    // DELETE user
    deleteUser({ params }, res) {
      User.findOneAndDelete({ _id: params.id })
           .then(dbUserData => {
              if (!dbUserData) {
                res.status(404).json({ message: 'No User found with this id!' });
                  return;
              }
              // remove user from any friend list
              User.updateMany(
                { __id: {$in: dbUserData.friends } },
                { $pull: { friends: params.id } }
              )
              .then(() => {
                // remove user comments
                Thought.deleteMany({ username: dbUserData.username })
                .then(() => {
                  res.json({ message: "Successfully deleted user!" });
                })
                .catch(err => res.status(400).json(err));
              })
              .catch(err => res.status(400).json(err));
              })
          .catch(err => res.json(err));
    },

      //ADD FRIENDS
      newFriend( { params }, res) {
        User.findOneAndUpdate({ _id: params.id }, { $addToSet: { friends: params.friendsId }}, {new: true})
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({ message: 'user not found'});
                    return;
                }
                res.json(dbUserData);
            })
            .catch(err => res.json(err));
      },

      //DELETE friend
      friendshipOver({ params }, res) {
        User.findOneAndUpdate({ _id: params.id }, {$pull: { friends: params.friendsId }}, {new: true})
            .then(dbUserData => {
                if(!dbUserData) {
                    res.status(404).json({ message: 'No user found'});
                    return;
                }
                res.json(dbUserData);
            })
            .catch(err => res.json(err));
      },


};


module.exports = UserController;