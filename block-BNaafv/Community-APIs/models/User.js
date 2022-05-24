const mongoose = require('mongoose');
const bcyrpt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Schema = mongoose.Schema;

const userSchema = new Schema ( {
    name: { type: String },
    email: { type: String, required: true, unique: true },
    username: { type: String, required: true, unique: true },
    image: String,
    bio: String,
    token: String,
    questions: [ { type: Schema.Types.ObjectId, ref: "questions" } ],
    answeres: [ { type: Schema.Types.ObjectId, ref: "answeres" } ],
    password: { type: String, minlength: 5, required: true }
}, { timestamps: true } );

userSchema.pre( 'save', async function( next ) {
    if ( this.password && this.isModified( 'password' ) ) {
        this.password = await bcyrpt.hash( this.password, 10 );
    }
    next();
} )

userSchema.methods.verifyPassword = async function( password ) {
    try {
        var result = await bcyrpt.compare( password, this.password );
        return result;
    } catch (error) {
        return error;
    }
}

userSchema.methods.signToken = async function() {
    console.log( this );
    const payload = { userId: this.id, email: this.email };
    try {
        const token = jwt.sign( payload, process.env.SECRET )
        return  token;
    } catch (error) {
        return error
    }
}

userSchema.methods.userJSON = function( token ) {
    return {
        token: token.split(".")[0],
        email: this.email,
        username: this.username
    }
}

module.exports = mongoose.model( 'User', userSchema );