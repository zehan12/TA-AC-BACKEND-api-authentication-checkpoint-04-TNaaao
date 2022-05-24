const Question = require("../models/Question");
const User = require("../models/User");

module.exports = {
    createQuestion: async ( req, res, next ) => {
        try {
            const author = await User.findById( req.users.userId ).select( "username" );
            const question = req.body;
            question.author = author;
            if ( req.body.tags ) {
                question.tags = req.body.tags.split(",");
            }
            const questionCreated = await Question.create( question );
            await User.findByIdAndUpdate( req.users.userId, { $push: { questions: questionCreated._id } } );
            res.status( 201 ).json( { question } );
        } catch (error) {
            return next ( error );
        }
    },

    listAllQuestions: async ( req, res, next ) => {
        try {
            const allQuestions  = await Question.find().populate({ path:'author', model: User } );
            // res.status( 201 ).json( { questions:  allQuestions.quesDisplay() } );
        } catch (error) {
            return next ( error )
        }
    }, 

    detailedQuestion: async ( req, res, next ) => {

    },

    
}