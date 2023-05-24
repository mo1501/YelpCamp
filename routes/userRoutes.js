const express = require('express');
const router = express.Router({ mergeParams: true });
const catchAsync = require('../utils/catchAsync');
const ExpressError = require('../utils/ExpressError');
const User = require('../models/user');
const passport = require('passport');
const { storeReturnTo } = require('../middleware');
const userController = require('../controllers/userController')

router.get('/register', userController.renderRegister);
router.post('/register', catchAsync(userController.registerUser));

router.get('/login', userController.renderlogin);
router.post('/login',storeReturnTo, passport.authenticate('local', { failureFlash: true, failureRedirect: '/login' }), catchAsync(userController.loginUser));

router.get('/logout',userController.logoutUser);


module.exports = router;