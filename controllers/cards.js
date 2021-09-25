const Card = require('../models/card');
const {
  ERROR_CODE_500, ERROR_CODE_404, ERROR_CODE_400,
} = require('../errors/errorCodes');

const getCards = async (req, res) => {
  try {
    const cards = await Card.find({});
    res.send({ data: cards });
  } catch (err) {
    res.status(ERROR_CODE_500).send({ message: 'Внутренняя ошибка сервера' });
  }
};

const deleteCard = async (req, res) => {
  try {
    const deletedCard = await Card.findByIdAndRemove(req.params.cardId)
      .orFail(new Error('NotValidId'));
    res.send({ data: deletedCard });
  } catch (err) {
    if (err.message === 'NotValidId') {
      res.status(ERROR_CODE_404).send({ message: ' Карточка с указанным _id не найдена.' });
    } if (err.name === 'CastError') {
      res.status(ERROR_CODE_400).send({ message: ' Переданы некорректные данные' });
    } else {
      res.status(ERROR_CODE_500).send({ message: 'Внутренняя ошибка сервера' });
    }
  }
};

const createCard = async (req, res) => {
  try {
    const { name, link } = req.body;
    const owner = req.user._id;
    const card = await Card.create({ name, link, owner });
    res.send({ data: card });
  } catch (err) {
    if (err.name === 'ValidationError') {
      res.status(ERROR_CODE_400).send({ message: 'Переданы некорректные данные при создании карточки' });
    } else {
      res.status(ERROR_CODE_500).send({ message: 'Внутренняя ошибка сервера' });
    }
  }
};

const addLike = async (req, res) => {
  try {
    const updatedCard = await Card.findByIdAndUpdate(req.params.cardId,
      { $addToSet: { likes: req.user._id } }, { new: true })
      .orFail(new Error('NotValidId'));
    res.send({ data: updatedCard });
  } catch (err) {
    if (err.message === 'NotValidId') {
      res.status(ERROR_CODE_404).send({ message: 'Карточка с указанным _id не найдена.' });
    } if (err.name === 'CastError') {
      res.status(ERROR_CODE_400).send({ message: 'Переданы некорректные данные для постановки/снятии лайка' });
    } else {
      res.status(ERROR_CODE_500).send({ message: 'Внутренняя ошибка сервера' });
    }
  }
};

const deleteLike = async (req, res) => {
  try {
    const updatedCard = await Card.findByIdAndUpdate(req.params.cardId,
      { $pull: { likes: req.user._id } },
      { new: true })
      .orFail(new Error('NotValidId'));
    res.send({ data: updatedCard });
  } catch (err) {
    if (err.message === 'NotValidId') {
      res.status(ERROR_CODE_404).send({ message: 'Карточка с указанным _id не найдена.' });
    } if (err.name === 'CastError') {
      res.status(ERROR_CODE_400).send({ message: 'Переданы некорректные данные для постановки/снятии лайка' });
    } else {
      res.status(ERROR_CODE_500).send({ message: 'Внутренняя ошибка сервера' });
    }
  }
};

module.exports = {
  getCards,
  deleteCard,
  createCard,
  addLike,
  deleteLike,
};
