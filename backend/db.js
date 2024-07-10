const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/paytm");

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique, true,
        trim: true,
        lowercase: true,
        miniLength: 3,
        maxLength: 30
    },
    password: {
        type: String,
        required: true,
        miniLength: 6
    },
    firstName: {
        type: String,
        required: true,
        trim: true,
        miniLength: 50
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
        miniLength: 50
    }
    
})



const User = mongoose.model("User", userSchema);

module.exports = {
    User
};
