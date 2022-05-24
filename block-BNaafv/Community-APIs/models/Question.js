const mongoose = require( 'mongoose' );
const Schema = mongoose.Schema;

const URLSlug = require("mongoose-slug-generator");
mongoose.plugin(URLSlug);

const questionSchema = new Schema ( {
    title: { type: String, require: true },
    author: { type: Schema.Types.ObjectId, ref: "user" },
    slug: { type: String, unique: true, slug: "title", slug_padding_size: 3 },
    description: String,
    tags: [ String ]
}, { timestamps: true } );

questionSchema.methods.quesJSON = function ( data ) {
    console.log(data);
}


module.exports = mongoose.model( "Question", questionSchema );