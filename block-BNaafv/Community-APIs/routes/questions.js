const router = require("express").Router();
const questionController = require("../controllers/questionController");
const auth = require("../middlewares/auth");

//* @desc      create a question
//* @route     POST /api/questions
router.post( '/', auth.verifyToken, questionController.createQuestion );

//* @desc      list all question
//* @route     GET /api/questions
router.get( '/', auth.authenticationOptional, questionController.listAllQuestions );

//* @desc      display single question
//* @route     GET /api/questions



module.exports = router;