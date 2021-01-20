const questionController = require('../Controller/question_controller');
const express = require('express');
const router = express.Router();
const checkAuth = require('../Middleware/check_auth');



router.post('/ask', checkAuth, questionController.postQuestion);
router.get('/:id', questionController.getQuestion);
router.delete('/:id', checkAuth, questionController.deleteQuestion);


module.exports = router;