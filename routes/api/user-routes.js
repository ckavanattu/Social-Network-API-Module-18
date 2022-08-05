const router = require('express').Router();

const {
    allUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    newFriend,
    friendshipOver

} = require('../../controllers/user-controller');

// main user
router.route('/').get(allUsers).post(createUser);

// user/:id
router.route('/:id').get(getUserById).put(updateUser).delete(deleteUser);

// friend routes
router.route('/:id/friends/:friendsId').post(newFriend).delete(friendshipOver);

module.exports = router;