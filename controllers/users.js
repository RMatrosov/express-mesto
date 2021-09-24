const User = require('../models/user');
const { ERROR_CODE_400, ERROR_CODE_500, ERROR_CODE_404 } = require('../errors/errorCodes');

async function getUsers(req, res) {
  try {
    const users = await User.find({});
    res.send({ data: users });
  } catch (err) {
    res.status(ERROR_CODE_500).send({ message: 'внутренняя ошибка сервера' });
  }
}

async function getUser(req, res) {
  try {
    const user = await User.findById(req.params.userId);
    res.send({ data: user });
  } catch (err) {
    if (err.name === 'CastError') {
      res.status(ERROR_CODE_404).send({ message: 'Пользователь по указанному _id не найден' });
    } else {
      res.status(ERROR_CODE_500).send({ message: 'внутренняя ошибка сервера' });
    }
  }
}

async function createUser(req, res) {
  try {
    const { name, about, avatar } = req.body;
    const user = await User.create({ name, about, avatar });
    res.send({ data: user });
  } catch (err) {
    if (err.name === 'ValidationError') {
      res.status(ERROR_CODE_400).send({ message: 'Переданы некорректные данные при создании пользователя' });
    } else {
      res.status(ERROR_CODE_500).send({ message: 'внутренняя ошибка сервера' });
    }
  }
}

async function changeUserInfo(req, res) {
  const { name, about } = req.body;
  try {
    const user = await User.findByIdAndUpdate(req.user._id, { name, about },
      { new: true, runValidators: true });
    res.send({ data: user });
  } catch (err) {
    if (err.name === 'ValidationError') {
      res.status(ERROR_CODE_400).send({ message: 'Переданы некорректные данные при создании пользователя' });
    } if (err.name === 'CastError') {
      res.status(ERROR_CODE_404).send({ message: 'Пользователь по указанному _id не найден' });
    } else {
      res.status(ERROR_CODE_500).send({ message: 'внутренняя ошибка сервера' });
    }
  }
}

async function changeUserAvatar(req, res) {
  try {
    const { avatar } = req.body;
    const userAvatar = await User.findByIdAndUpdate(req.user._id, { avatar },
      { new: true, runValidators: true });
    res.send({ data: userAvatar });
  } catch (err) {
    if (err.name === 'ValidationError') {
      res.status(ERROR_CODE_400).send({ message: 'Переданы некорректные данные при создании пользователя' });
    } if (err.name === 'CastError') {
      res.status(ERROR_CODE_404).send({ message: 'Пользователь по указанному _id не найден' });
    } else {
      res.status(ERROR_CODE_500).send({ message: 'внутренняя ошибка сервера' });
    }
  }
}

module.exports = {
  changeUserInfo,
  changeUserAvatar,
  createUser,
  getUser,
  getUsers,
};
