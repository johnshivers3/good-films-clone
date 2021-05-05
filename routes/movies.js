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


router.get('/:id', asyncHandler( async (req, res) => {
    const movieId = parseInt(req.params.id, 10);

    const movie = await db.Movie.findOne({
        where: {id: movieId }
    });

    res.render('movies', {
        movie
    })
}))







module.exports = router;