const express = require("express");
const { check, validationResult } = require("express-validator");

const db = require("../db/models");
const { csrfProtection, asyncHandler } = require("./utils");

const router = express.Router();

const { User } = db;

const reviewValidators = [
  check("content")
    .exists({ checkFalsy: true })
    .withMessage("Please provide a value for the content of your review")
    .notEmpty({ checkFalsy: true })
    .withMessage("Please provide a value for the content of your review"),
  check("rating").exists({ checkFalsy: true }),
];

router.post(
  "/reviews",
  reviewValidators,
  asyncHandler(async (req, res, next) => {
    const { content, rating, movieId, userId } = req.body;
    const review = await db.Review.create({
      content,
      rating,
      movieId,
      userId,
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

    // Grab info for the movie and the list of reviews 
    const movie = await db.Movie.findOne({
      where: { id: movieId },
    });
    const reviews = await db.Review.findAll({
      where: { movieId },
      include: User,
    });

    // Formatting reviews
    let reviewsFormatted = [];

    reviews.forEach((review, i) => {
        const split = review.createdAt.toString().split(' ');
        const dateFormatted = `${split[0]} ${split[1]} ${split[2]} ${split[3]}`

        const newReview = {
            user: `${review.User.firstName} ${review.User.lastName}`,
            date: dateFormatted,
            rating: review.rating,
            content: review.content,
            userId: review.User.id
        }
        reviewsFormatted.push(newReview);

    });

    reviewsFormatted.reverse();

    // Setup variables for collections 
    let bigCollections;
    let dropDownCollections = [];
    let listCollections = [];

    if (req.session.auth) {
        bigCollections = await db.Collection.findAll({
            where: {
                userId: req.session.auth.userId,
            }, 
            include: db.Movie
        })
    
        for (collection of bigCollections) {
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
    }

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
