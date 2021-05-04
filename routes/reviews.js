const express = require('express');
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs')

const db = require('../db/models');
const { csrfProtection, asyncHandler } = require('./utils');
const { loginUser, logoutUser } = require('../auth');
const { ContextHandlerImpl } = require('express-validator/src/chain');

const router = express.Router();


router.get('/create', csrfProtection, (req, res) => {
    const review = db.Review.build();
    res.render('create-review', {
        title: 'Create Review',
        review,
        csrfToken: req.csrfToken(),
    });
});

const reviewValidators = [
    check('content')
        .exists({ checkFalsy: true })
        .withMessage('Please provide a value for the content of your review'),
        // .isLength({ min: 50 })
        // .withMessage('First Name must not be more than 50 characters long'),
    check('rating')
        .exists({ checkFalsy: true })
        .withMessage('Please provide a value for Last Name')
        .isLength({ min: 1 , max: 5})
        .withMessage('Rating must be between 1 and 5')
];

router.post('/'), csrfProtection, reviewValidators, asyncHandler( async (req, res) => {
    const { content, rating, movieId} = req.body;
    const userId = req.locals.user.id;

    const review = db.Review.build({
        content,
        rating,
        movieId,
        userId
    });

    const validatorErrors = validationResult(req);

    if (validatorErrors.isEmpty()) {
        await review.save();
        res.redirect('/');
    } else {
        const errors = validatorErrors.array().map((error) => error.msg);
        res.render('create-review', {
            title: 'Create Review',
            review,
            errors,
            csrfToken: req.csrfToken(),
        });
    }
})







module.exports = router;