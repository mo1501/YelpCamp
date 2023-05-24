const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const ExpressError = require('../utils/ExpressError');
const campgroundController = require('../controllers/campgroundController');
const Campground = require('../models/campground');
const Review = require('../models/review');
const { isLoggedIn, isAuthor, validateCampground } = require('../middleware');

router.get('/', catchAsync(campgroundController.index));
router.get('/new', isLoggedIn, catchAsync(campgroundController.renderNewForm));
router.post('/', isLoggedIn, validateCampground, catchAsync(campgroundController.createCampground));
router.get('/:id', catchAsync(campgroundController.showCampground));
router.get('/:id/edit', isLoggedIn, isAuthor, catchAsync(campgroundController.renderEditForm));
router.put('/:id', isLoggedIn, isAuthor, validateCampground, catchAsync(campgroundController.updateCampground));
router.delete('/:id', isLoggedIn, isAuthor, catchAsync(campgroundController.deleteCampground));
module.exports = router;