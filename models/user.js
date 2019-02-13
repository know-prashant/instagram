const mongoose = require('mongoose');
const { Schema } = mongoose;
const { createBcrypt, compareBcrypt } = require('../helpers/password-bcrypt');

const userSchema = new Schema({
    fullname: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
    }
});

//This is called a pre-hook, before the user information is saved
userSchema.pre('save', async function(next){
    const user = this;

    const hash = await createBcrypt(user.password);
    
    this.password = hash;

    next();
});

//Use this to make sure password is matching
userSchema.methods.isValidPassword = async function(password){
    const user = this;

    const compare = await compareBcrypt(password, user.password);

    return compare;
};


mongoose.model('users', userSchema);