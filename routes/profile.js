const express = require("express");
const { check, validationResult } = require("express-validator");
const db = require("../db/models");
const { logoutUser} = require('../auth')

const { asyncHandler, csrfProtection } = require("./utils");

const router = express.Router();


router.post(
  "/:collectionId/:movieId", asyncHandler(async(req, res) => {

    try {
      await db.Movies_Collection.create({
        movieId: req.body.movieId,
        collectionId: req.body.collectionId
      })
      res.redirect(201,'back')
    } catch (error) {
      throw new Error(error);
    }
  })
)

// delete movies_Collection
router.post(
  "/delete/:collectionId/:collectionName/:movieId", asyncHandler(async (req, res) => {
    console.log('in post')
    const movies_CollectionRow = await db.Movies_Collection.findOne({
      where: {
        collectionId: req.params.collectionId,
        movieId: req.params.movieId
      }
    })
    console.log(movies_CollectionRow)
    console.log('about to try to delete it')

    try {
      await movies_CollectionRow.destroy()
      console.log('destroyed')
      res.redirect(201, 'back')
    } catch (error) {
      throw new Error(error);
    }
  })
)

router.get(
  "/:id",
  csrfProtection,
  asyncHandler(async (req, res) => {
    const userId = parseInt(req.params.id, 10);
    const collection = db.Collection.build();
    const user = await db.User.findOne({
      where: { id: userId },
      include: [
        { model: db.Review, include: db.Movie },
        { model: db.Collection, include: db.Movie },
      ],

    });

    const { id, firstName, lastName, Reviews, Collections } = user.dataValues;

    res.render("user-profile", {
      title: "My GoodFilms",
      id,
      firstName,
      lastName,
      Reviews,
      Collections,
      csrfToken: req.csrfToken(),
      collection,
    });
  })
);

const collectionValidators = [
  check("name")
    .exists({ checkFalsy: true })
    .withMessage("Please provide a name for your collection.")
    .isLength({ max: 255 })
    .withMessage(
      "Name of collection must not be more than 255 characters long"
    ),
];

router.post(
  "/:userId",
  csrfProtection,
  collectionValidators,
  asyncHandler(async (req, res) => {
    const { name } = req.body;
    const userId = parseInt(req.params.userId);

    const user = await db.User.findOne({
      where: { id: userId },
      include: [
        { model: db.Review, include: db.Movie },
        { model: db.Collection, include: db.Movie },
      ],
    });

    const { id, firstName, lastName, Reviews, Collections } = user.dataValues;

    const collection = await db.Collection.build({
      name,
      userId,
    });

    const validatorErrors = validationResult(req);

    if (validatorErrors.isEmpty()) {
      await collection.save();
      res.redirect(`/profile/${userId}`);
    } else {
      const errors = validatorErrors.array().map((error) => error.msg);
      res.render("user-profile", {
        title: "My GoodFilms",
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
  })
  );


  router.post(
    '/delete/:id',
    csrfProtection,
    asyncHandler(async (req, res) => {
      const userId = parseInt(req.params.id, 10);
      const user = await db.User.findByPk(userId);
      if(user){
        await user.destroy();
        logoutUser(req,res)
        req.session.save(() => res.redirect("/"))
      }
    })
  );

  router.post(
    "/:collectionId/:movieId",
    asyncHandler(async (req, res) => {
      const collectionId = parseInt(req.params.collectionId, 10);
      const movieId = parseInt(req.params.movieId, 10);

      try {
        console.log("about to create a collection connection");
        await db.Movies_Collection.create({
          collectionId,
          movieId,
        });

      } catch {
      throw new Error("Unable to create Movies_Collection connection!!! ");
    }
  })
);

router.post(
  "/collection/delete/:id",
  csrfProtection,
  asyncHandler(async (req, res) => {
    const collectionId = parseInt(req.params.id, 10);
    const collection = await db.Collection.findByPk(collectionId);

    if (collection) {
      await collection.destroy();
      res.redirect(`/profile/${collection.userId}`);
    }
  })
);

router.get(
  "/collection/edit/:id",
  collectionValidators,
  csrfProtection,
  asyncHandler(async (req, res) => {
    const newName = req.query.name;

    const collectionId = parseInt(req.params.id, 10);
    const collection = await db.Collection.findByPk(collectionId);

    const user = await db.User.findOne({
      where: { id: collection.userId },
      include: [
        { model: db.Review, include: db.Movie },
        { model: db.Collection, include: db.Movie },
      ],
    });

    const { id, firstName, lastName, Reviews, Collections } = user.dataValues;

    const validatorErrors = validationResult(req);

    if (validatorErrors.isEmpty()) {
      if (collection) {
        await collection.update({
          name: newName,
        });

        res.redirect(`/profile/${collection.userId}`);
      }
    } else {
      const errors = validatorErrors.array().map((error) => error.msg);
      res.render("user-profile", {
        title: "My GoodFilms",
        id,
        firstName,
        lastName,
        Reviews,
        Collections,
        errors,
        csrfToken: req.csrfToken(),
      });
    }
  })
);

module.exports = router;
