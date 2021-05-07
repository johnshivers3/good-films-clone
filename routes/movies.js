const express = require('express');
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs')
const { sequelize, Sequelize } = require('../db/models');
const Op = Sequelize.Op
const db = require('../db/models');
const { csrfProtection, asyncHandler } = require('./utils');
const { loginUser, logoutUser } = require('../auth');

const reviewsRouter = require('./reviews');

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


    const bigCollections = await db.Collection.findAll({
        where: {
            userId: req.session.auth.userId,
        }, 
        include: db.Movie
    })

    // console.log(collections[0].Movies)


    let dropDownCollections = [];
    let listCollections = [];

    // for (let i = 0; i < bigCollections.length; i++) {
        
        
    // }
    for (collection of bigCollections) {
        console.log('this is each collection..................', collection);
        let bool = false
        for (movieLoop of collection.Movies) {
            if (movieLoop.id === movie.id) {
                listCollections.push(collection);
                bool = true;
            } 
        }
        if (!bool) {
            dropDownCollections.push(collection);
        }
    }
    console.log('bigCollections', bigCollections)
    console.log('dropDownCollections', dropDownCollections);
    console.log('listCollections', listCollections);

    res.render('movies', {
        movie,
        reviewsFormatted,
        csrfToken: req.csrfToken(),
        bigCollections,
        dropDownCollections,
        listCollections
    })
}))







module.exports = router;
