const router = require('express').Router();
const {
  getUsers, getUser, createUser, changeUserInfo, changeUserAvatar,
} = require('../controllers/users');

router.get('/users', getUsers);
router.get('/users/:userId', getUser);
router.post('/users', createUser);
router.patch('/users/me', changeUserInfo);
router.patch('/users/me/avatar', changeUserAvatar);

module.exports = router;
