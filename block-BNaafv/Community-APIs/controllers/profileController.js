const User = require("../models/User");

module.exports = {
    profileInfo: async ( req, res, next ) => {
        try {
            const username = req.params.username
            const profile = await User.findOne( { username } ).select( " -_id name username image bio " );
            res.json({ profile })
        } catch (error) {
            return next ( error );
        }
    }, 

    profileUpdate: async ( req, res, next ) => {
        console.log(req.params.username)
        // console.log(req.body)
        try {
            const userUpdate = req.body;
            const username = req.params.username
            const profile = await User.findOneAndUpdate( { username }, userUpdate, { new: true } ).select( " -_id name username image bio " );
            res.json({ profile });
        } catch (error) {
            return next( error )
        }
    }
}