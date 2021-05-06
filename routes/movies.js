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

    console.log(reviews)

    reviews.array().map(review => review.createdAt = review.createdAt.slice(0, 14))

    // for (review in reviews) {
    //     console.log(review)
    //     review.createdAt = review.createdAt.slice(0, 14);
    // }

    // for (let i = 0; i < reviews.length; i++) {
    //     reviews[i].createdAt = reviews[i].createdAt.splice(0, 14)
        
    // }

    // reviews.foreach(review => {
    //     review.createdAt = review.createdAt.slice(0, 14);
    // });

    res.render('movies', {
        movie,
        reviews
    })
}))







module.exports = router;