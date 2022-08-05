const { User } = require('../models');

const UserController = {
    // GET all
    allUsers(req, res) {
        User.find({})
            .then(dbUserData => res.json(dbUserData))
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    },

    // GET one user
    getUserById({ params }, res) {
        User.findOne({_id: params.id })
            .then(dbUserData => {
                if(!dbUserData) {
                    res.status(404).json({message: 'user not found'});
                    return;
                }
                res.json(dbUserData);
            })
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
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
    deleteUser( { params }, res) {
        User.findOneAndDelete({ _id: params.id })
            .then(dbUserData => {
                if(!dbUserData) {
                    res.status(404).json({message: 'user not found'});
                    return;
                }
                res.json(dbUserData);
            })
            .catch(err=> res.status(400).json(err));
    }


}


module.exports = UserController;