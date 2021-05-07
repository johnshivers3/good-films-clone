const express = require('express');
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs')

const db = require('../db/models');
const { csrfProtection, asyncHandler } = require('./utils');
const { loginUser, logoutUser } = require('../auth');
const { ContextHandlerImpl } = require('express-validator/src/chain');

const reviewsRouter = require('./reviews')

const router = express.Router();

// router.use('/reviews', reviewsRouter);

const { User } = db;

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

router.post('/reviews', asyncHandler( async (req, res) => {
    const { content, rating, movieId, userId} = req.body;

    const review = await db.Review.create({
        content,
        rating,
        movieId,
        userId
    });

    const validatorErrors = []
    await review.save();
    res.status(201).json(review);
    
    // if (validatorErrors.isEmpty()) {
    // } else {
    //     const errors = validatorErrors.array().map((error) => error.msg);
    //     res.render('create-review', {
    //         title: 'Create Review',
    //         review,
    //         errors,
    //         csrfToken: req.csrfToken(),
    //     });
    // }
}))

// router.post('/reviews', asyncHandler( async (req, res) => {
//     const { content, rating, movieId, userId} = req.body;

//     console.log("before creation")

//     const review = await db.Review.create({
//         content,
//         rating,
//         movieId,
//         userId
//     });

//     console.log("THIS IS THE REVIEW",review)

//     res.status(201).json(review);


//     // const validatorErrors = [];

//     // if (validatorErrors.isEmpty()) {
//     //     console.log("about to save!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!")
//     //     await review.save();
//     //     res.status(201).json(review);
//     // } else {
//     //     const errors = validatorErrors.array().map((error) => error.msg);
//     //     res.render('create-review', {
//     //         title: 'Create Review',
//     //         review,
//     //         errors,
//     //         csrfToken: req.csrfToken(),
//     //     });
//     // }
// }))


router.get('/:id', csrfProtection, asyncHandler( async (req, res) => {
    const movieId = parseInt(req.params.id, 10);

    const movie = await db.Movie.findOne({
        where: {id: movieId }
    });

    const reviews = await db.Review.findAll({
        where: { movieId },
        include: User
    })

    let reviewsFormatted = []

    reviews.forEach((review, i) => {
        const split = review.createdAt.toString().split(' ');
        const dateFormatted = `${split[0]} ${split[1]} ${split[2]} ${split[3]}`

        const newReview = {
            user: `${review.User.firstName} ${review.User.lastName}`,
            date: dateFormatted,
            content: review.content
        }
        reviewsFormatted.push(newReview);
    });

    reviewsFormatted.reverse();


    const collections = await db.Collection.findAll({
        where: {
            userId: req.session.auth.userId
        }
    })

    res.render('movies', {
        movie,
        reviewsFormatted,
        csrfToken: req.csrfToken(),
        collections
    })
}))







module.exports = router;