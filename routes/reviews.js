const express = require('express');
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs')

const db = require('../db/models');
const { csrfProtection, asyncHandler } = require('./utils');
const { loginUser, logoutUser } = require('../auth');

const router = express.Router();


// router.get('/:id/:title/reviews', csrfProtection, (req, res) => {
//     const review = db.Review.build();
//     const movieId = parseInt(req.params.id, 10);
//     const userId = parseInt(res.locals.user.id, 10);
//     const movieTitle = req.params.title;
//     res.render('create-review', {
//         title: 'Create Review',
//         review,
//         movieId,
//         movieTitle,
//         userId,
//         csrfToken: req.csrfToken(),
//     });
// });

const reviewValidators = [
    check('content')
        .exists({ checkFalsy: true })
        .withMessage('Please provide a value for the content of your review'),
        // .isLength({ min: 50 })
        // .withMessage('First Name must not be more than 50 characters long'),
    check('rating')
        .exists({ checkFalsy: true })
        .withMessage('Please provide a value for rating')
        // .isLength({ min: 1 , max: 5})
        // .withMessage('Rating must be between 1 and 5')
];

router.post('/', csrfProtection, reviewValidators, asyncHandler( async (req, res) => {
    const { content, rating, movieId, userId} = req.body;

    const review = await db.Review.create({
        content,
        rating,
        movieId,
        userId
    });

    console.log("THIS IS THE REVIEW",review)

    const validatorErrors = validationResult(req)
    
    if (validatorErrors.isEmpty()) {
        await review.save();
        res.status(201).json(review);
    } else {
        const errors = validatorErrors.array().map((error) => error.msg);
        res.render('create-review', {
            title: 'Create Review',
            review,
            errors,
            csrfToken: req.csrfToken(),
        });
    }
}))







module.exports = router;