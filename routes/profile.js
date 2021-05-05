const express = require('express');

const db = require('../db/models');

const { asyncHandler, csrfProtection } = require('./utils');

const router = express.Router();

router.get('/:id', asyncHandler(async(req, res) => {
  const userId = parseInt(req.params.id, 10);

  const user = await db.User.findOne({where: {id:userId}, include: ['Reviews', 'Collections']});

  const{firstName, lastName, Reviews, Collections, } = user.dataValues;

  res.render('user-profile', {title: 'Profile', firstName, lastName, Reviews, Collections } )
}))


module.exports = router
