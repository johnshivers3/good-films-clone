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
    const validatorErrors = validationResult(req);

    if (validatorErrors.isEmpty()) {
      await review.save();
      res.status(201).json(review);
    } else {
      const errors = validatorErrors.array().map((error) => error.msg);
      throw new Error(errors);
    }
  })
);

router.get(
  "/:id",
  csrfProtection,
  asyncHandler(async (req, res) => {
    const movieId = parseInt(req.params.id, 10);

    const movie = await db.Movie.findOne({
      where: { id: movieId },
    });

    const reviews = await db.Review.findAll({
      where: { movieId },
      include: User,
    });

    let reviewsFormatted = [];

    reviews.forEach((review, i) => {
        const split = review.createdAt.toString().split(' ');
        const dateFormatted = `${split[0]} ${split[1]} ${split[2]} ${split[3]}`

        const newReview = {
            user: `${review.User.firstName} ${review.User.lastName}`,
            date: dateFormatted,
            rating: review.rating,
            content: review.content
        }
        reviewsFormatted.push(newReview);

    });

    reviewsFormatted.reverse();

    const collections = await db.Collection.findAll({
      where: {
        userId: `${req.session.auth ? req.session.auth.userId : 0}`,
      },
    });

    res.render("movies", {
      movie,
      reviewsFormatted,
      csrfToken: req.csrfToken(),
      collections,
    });
  })
);

module.exports = router;
