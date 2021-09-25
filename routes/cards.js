const router = require('express').Router();

const {
  getCards, deleteCard, createCard, addLike, deleteLike,
} = require('../controllers/cards');

router.get('/cards', getCards);
router.delete('/cards/:cardId', deleteCard);
router.post('/cards', createCard);
router.put('/cards/:cardId/likes', addLike);
router.delete('/cards/:cardId/likes', deleteLike);

module.exports = router;
