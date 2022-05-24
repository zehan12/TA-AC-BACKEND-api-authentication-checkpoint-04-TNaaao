const express = require('express');
const router = express.Router();
const auth = require("../middlewares/auth");

const profileController = require("../controllers/profileController");

//* @desc      get profile information
//* @route     GET /api/profile/:username
router.get( '/:username', auth.authenticationOptional, profileController.profileInfo );

//* @desc      update user profile information
//* @route     PUT /api/profile/:username
router.put( '/:username', auth.verifyToken, profileController.profileUpdate );

module.exports = router
