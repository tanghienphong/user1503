const moongoose = require('mongoose');
var Schema = moongoose.Schema;

const UserSchema = new Schema({
    email : {type: String, required: true, unique: true},
    fullname: String,
    password: {type: String, required: true}
})

const UserModel = moongoose.model('user',UserSchema)
module.exports = {UserModel}