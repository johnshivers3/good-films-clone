const express = require("express");

const db = require("../db/models");

const { asyncHandler, csrfProtection } = require("./utils");

const router = express.Router();

router.get(
  "/:id",
  asyncHandler(async (req, res) => {
    const userId = parseInt(req.params.id, 10);

    const user = await db.User.findOne({
      where: { id: userId },
      include: [{model: db.Review, include: db.Movie}, { model: db.Collection, include: db.Movie }],
      // include: [{ all: true }]
    });

    const { firstName, lastName, Reviews, Collections } = user.dataValues;
    console.log(user.Collections[0].Movies);
    res.render("user-profile", {
      title: "Profile",
      firstName,
      lastName,
      Reviews,
      Collections,
    });
  })
);

module.exports = router;
