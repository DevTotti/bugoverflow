const questionController = require('../Controller/question_controller');
const express = require('express');
const router = express.Router();

router.get('/', questionController.getQuestions);

module.exports = router;