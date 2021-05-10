const express = require('express');
const { check, validationResult } = require('express-validator');

const db = require('../db/models');
const { csrfProtection, asyncHandler } = require('./utils');

const router = express.Router();

const reviewValidators = [
    check('content')
        .exists({ checkFalsy: true })
        .withMessage('Please provide a value for the content of your review'),

    check('rating')
        .exists({ checkFalsy: true })
        .withMessage('Please provide a value for rating')

];

router.post('/', csrfProtection, reviewValidators, asyncHandler( async (req, res) => {
    const { content, rating, movieId, userId} = req.body;

    const review = await db.Review.create({
        content,
        rating,
        movieId,
        userId
    });



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
