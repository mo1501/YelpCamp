const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const ExpressError = require('../utils/ExpressError');
const campgroundController = require('../controllers/campgroundController');
const Campground = require('../models/campground');
const Review = require('../models/review');
const { storage } = require('../cloudinary')
const multer = require('multer');
const upload = multer({ storage });
const { isLoggedIn, isAuthor, validateCampground } = require('../middleware');

router.get('/', catchAsync(campgroundController.index));
router.get('/new', isLoggedIn, catchAsync(campgroundController.renderNewForm));
router.post('/', isLoggedIn, upload.array('image'), validateCampground, catchAsync(campgroundController.createCampground));
// router.post('/', upload.single('image'), (req, res) => {

//     console.log(req.body, req.file)
//     res.send('It worked');
// });
router.get('/:id', catchAsync(campgroundController.showCampground));
router.get('/:id/edit', isLoggedIn, isAuthor, catchAsync(campgroundController.renderEditForm));
router.put('/:id', isLoggedIn, isAuthor,upload.array('image'), validateCampground, catchAsync(campgroundController.updateCampground));
router.delete('/:id', isLoggedIn, isAuthor, catchAsync(campgroundController.deleteCampground));
module.exports = router;