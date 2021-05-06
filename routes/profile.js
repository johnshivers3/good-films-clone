const express = require("express");
const { check, validationResult } = require('express-validator');
const db = require("../db/models");

const { asyncHandler, csrfProtection } = require("./utils");

const router = express.Router();

router.get(
  "/:id",
  csrfProtection,
  asyncHandler(async (req, res) => {
    const userId = parseInt(req.params.id, 10);
    const collection = db.Collection.build();
    const user = await db.User.findOne({
      where: { id: userId },
      include: [{model: db.Review, include: db.Movie}, { model: db.Collection, include: db.Movie }],
      // include: [{ all: true }]
    });

    const { id, firstName, lastName, Reviews, Collections } = user.dataValues;

    res.render("user-profile", {
      title: "Profile",
      id,
      firstName,
      lastName,
      Reviews,
      Collections,
      csrfToken: req.csrfToken(),
      collection
    });
  })
);

const reviewValidators = [
  check('name')
      .exists({ checkFalsy: true })
      .withMessage('Please provide a name for your collection.')
      .isLength({ max: 255 })
      .withMessage('Name of collection must not be more than 255 characters long'),
];

router.post('/:id', csrfProtection, reviewValidators, asyncHandler( async (req, res) => {
  const { name } = req.body;
  const userId = parseInt(req.params.id)

  const user = await db.User.findOne({
    where: { id: userId },
    include: [{model: db.Review, include: db.Movie}, { model: db.Collection, include: db.Movie }],
    // include: [{ all: true }]
  });

  const { id, firstName, lastName, Reviews, Collections } = user.dataValues;


  const collection = await db.Collection.build({
      name,
      userId
  });

  const validatorErrors = validationResult(req);

  console.log(req.csrfToken());

  if (validatorErrors.isEmpty()) {
      await collection.save();
      res.redirect(`/profile/${userId}`);
  } else {
      const errors = validatorErrors.array().map((error) => error.msg);
      res.render('user-profile', {
        title: "Profile",
        id,
        firstName,
        lastName,
        Reviews,
        Collections,
        errors,
        csrfToken: req.csrfToken(),
        collection,
      });
  }
}))
module.exports = router;
