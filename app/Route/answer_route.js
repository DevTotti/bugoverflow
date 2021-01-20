const express = require('express');
const router =  express.Router();
const answerController = require('../Controller/answer_controller');
const checkAuth =  require('../Middleware/check_auth');

router.post('/:id', checkAuth, answerController.postAnswer);
router.delete('/:id', checkAuth, answerController.deleteAnswer);


module.exports = router;