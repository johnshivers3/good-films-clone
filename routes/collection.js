const express = require('express');
const { check, validationResult } = require('express-validator');

const db = require('../db/models');
const { csrfProtection, asyncHandler } = require('./utils');

const router = express.Router();

router.get('/collection', csrfProtection, (req, res) => {
    const collection = db.Collection.build();
    const userId = parseInt(res.locals.user.id, 10);
    const movieTitle = req.params.title;
    res.render('create-collection', {
        title: 'Create Collection',
        collection,
        userId,
        csrfToken: req.csrfToken(),
    });
});

const reviewValidators = [
    check('name')
        .exists({ checkFalsy: true })
        .withMessage('Please provide a name for your collection.'),
        // .isLength({ min: 50 })
        // .withMessage('First Name must not be more than 50 characters long'),
];

router.post('/collection', csrfProtection, reviewValidators, asyncHandler( async (req, res) => {
    const { name, userId} = req.body;

    const collection = await db.Collection.build({
        name,
        userId
    });

    const validatorErrors = validationResult(req);

    if (validatorErrors.isEmpty()) {
        await collection.save();
        res.redirect('/');
    } else {
        const errors = validatorErrors.array().map((error) => error.msg);
        res.render('create-collection', {
            title: 'Create Collection',
            collection,
            errors,
            csrfToken: req.csrfToken(),
        });
    }
}))

module.exports = router;