const express = require('express');
const userController = require('../Controller/user_controller');
const router =  express.Router();

router.post('/signup', userController.signUp);
router.post('/signin', userController.signIn);


module.exports = router; 