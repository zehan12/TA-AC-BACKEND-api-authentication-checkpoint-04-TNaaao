var express = require('express');
var router = express.Router();
var auth = require("../middlewares/auth");

const userController = require("../controllers/userController");

//* @desc      user registration
//* @route     GET /api/users/register
router.post( "/register", userController.register );

//* @desc      user login
//* @route     GET /api/users/login
router.post( "/login", userController.login );

//* @desc      get current user
//* @route     GET /api/users/current-user
router.get( "/current-user", auth.verifyToken, userController.currentUser );

module.exports = router;

