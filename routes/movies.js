const express = require('express');
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs')

const db = require('../db/models');
const { csrfProtection, asyncHandler } = require('./utils');
const { loginUser, logoutUser } = require('../auth');
const { ContextHandlerImpl } = require('express-validator/src/chain');

const reviewsRouter = require('./reviews')

const router = express.Router();

router.use('/', reviewsRouter);

const { User } = db;


router.get('/:id', asyncHandler( async (req, res) => {
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

    res.render('movies', {
        movie,
        reviewsFormatted
    })
}))







module.exports = router;