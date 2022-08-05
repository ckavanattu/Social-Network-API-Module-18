const router = require('express').Router();

const {
    allUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser

} = require('../../controllers/user-controller');

// main user
router.route('/').get(allUsers).post(createUser);

// user/:id
router.route('/:id').get(getUserById).put(updateUser).delete(deleteUser);