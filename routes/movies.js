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

router.post('/reviews', asyncHandler( async (req, res) => {
    const { content, rating, movieId, userId} = req.body;

    console.log("before creation")

    const review = await db.Review.create({
        content,
        rating,
        movieId,
        userId
    });

    console.log("THIS IS THE REVIEW",review)

    res.status(201).json(review);


    // const validatorErrors = [];

    // if (validatorErrors.isEmpty()) {
    //     console.log("about to save!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!")
    //     await review.save();
    //     res.status(201).json(review);
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
        const dateFormatted = `${split[0]} ${split[1]} ${split[2]}`

        const newReview = {
            user: `${review.User.firstName} ${review.User.lastName}`,
            date: dateFormatted,
            content: review.content
        }
        reviewsFormatted.push(newReview);
    });


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